var jsonObject  =[
  {
      "id": "01",
      "name": "01",
      "children": [{
          "id": "0101",
          "name": "0101",
          "children": [{
              "id": "010101",
              "name": "010101"
          }, {
              "id": "010102",
              "name": "010102"
          }, {
              "id": "010103",
              "name": "010103",
              "children": [{
                  "id": "01010301",
                  "name": "01010301"
              }]
          }]
      }, {
          "id": "0102",
          "name": "0102"
      }]
  },
  {
      "id": "02",
      "name": "02",
      "children": [{
          "id": "0201",
          "name": "0201",
          "children": [{
              "id": "020101",
              "name": "020101"
          }, {
              "id": "020102",
              "name": "020102"
          }, {
              "id": "020103",
              "name": "020103",
              "children": [{
                  "id": "02010301",
                  "name": "02010301"
              }]
          }]
      }, {
          "id": "0202",
          "name": "0202"
      }]
  },
  {
      "id": "03",
      "name": "03",
      "children": [{
          "id": "0301",
          "name": "0301",
          "children": [{
              "id": "030101",
              "name": "030101"
          }, {
              "id": "030102",
              "name": "030102"
          }, {
              "id": "030103",
              "name": "030103",
              "children": [{
                  "id": "03010301",
                  "name": "03010301"
              }]
          }]
      }, {
          "id": "0302",
          "name": "0302"
      }]
  }
];

const x = 3
const y = 2
const z = 1
const gData = jsonObject


const dataList = []
const generateList = (data, parentKey) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    let nodeCloned = {...node}
    delete nodeCloned.children;
    dataList.push({...nodeCloned, parentId:parentKey})
    if (node.children) {
      generateList(node.children, node.id)
    }
  }
}
generateList(gData)

console.log("dataList", dataList)

// 怎么生成：
// 查找满足条件的每一个元素
// 判断是否有parentId ？ 
// 若有，新建一个node=currentNode，同时，dataList查找id=parentId的元素,parentNode，设置元素inserted属性为true
// 新建一个元素node=parentNode, node.children.push(currentNode)
// 若无，则为根节点，tree.push(currentNode)
// 卡住了，无法判断在哪一层，插入多个子节点

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0'
  const tns = _tns || gData

  const children = []
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`
    tns.push({ title: key, key, scopedSlots: { title: 'title' }})
    if (i < y) {
      children.push(key)
    }
  }
  if (_level < 0) {
    return tns
  }
  const level = _level - 1
  children.forEach((key, index) => {
    tns[index].children = []
    return generateData(level, key, tns[index].children)
  })
}
generateData(z)
// let resultTree = [];
// const generateResultTree = (node) => {
//   if(!node._inserted) {
//     node._inserted = true;

//     if(node.parentId) {
//       let parentNode = dataList.filter(item => item.id === node.parentId)
//       parentNode.children = [];
//       parentNode.children.push(currentNode);
//       resultTree = generateResultTree(parentNode);
//     } else {
//       resultTree.push(node)
//     }
//   } else {
//     // 
//   }

//   return resultTree;
// }



function test1(propertyName) {
    const filteredDataList = dataList.filter(item => item.id === "101" || item.name === "101")
    generateResultTree(filteredDataList);
    console.log(resultTree);
}

// const getParentKey = (key, tree) => {
//   let parentKey
//   for (let i = 0; i < tree.length; i++) {
//     const node = tree[i]
//     if (node.children) {
//       if (node.children.some(item => item.id === key)) {
//         parentKey = node.id
//       } else if (getParentKey(key, node.children)) {
//         parentKey = getParentKey(key, node.children)
//       }
//     }
//   }
//   return parentKey
// }

// function test1(propertyName) {
//     const parentKeys = dataList.map((item) => {
//       if (item[propertyName] && item[propertyName].includes("101")) {
//         return getParentKey(item.id, gData)
//       }
//       return null
//     })

//     const expandedKeys = new Set(parentKeys);
//     // .filter((item, i, self) => {
//     //   return item && self.indexOf(item) === i
//     // })

//     console.table(expandedKeys)
//     // Object.assign(this, {
//     //   expandedKeys,
//     //   searchValue: "101",
//     //   autoExpandParent: true,
//     // })
// }

test1()