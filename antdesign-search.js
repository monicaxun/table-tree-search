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

const generateResultTree = (node,clonedDataList, resultTree) => {
    if(node._inserted) {
        // No logic
    } else {
        node._inserted = true;

        if(node.parentId) {
          let parentNode = clonedDataList.find(item => item.id === node.parentId)
          parentNode.children = parentNode.children ? parentNode.children : [];
          parentNode.children.push(node);
          generateResultTree(parentNode, clonedDataList, resultTree);
        } else {
          resultTree.push(node)
        }
    }

  return resultTree;
}



function test1(keyword, props) {
    // 搜索出来所有数据，下面开始拼接树状结构
    let dataListCloned = [];
    let filteredDataList = new Set();
    dataList.forEach(item => {
      let cloneItem = {...item};
      dataListCloned.push(cloneItem);
      if(typeof props === "string") {
        if(item[props].includes(keyword)) {
          filteredDataList.add(cloneItem);
        }
      } else if(Array.isArray(props)) {
        props.forEach(p => {
          if(item[p].includes(keyword)) {
            filteredDataList.add(cloneItem)
          }
        })
      }

    })

    let resultTree = [];
    filteredDataList.forEach(node => {
        // 无法多次查找，需要深度克隆一遍？
        generateResultTree(node,dataListCloned, resultTree);
    })
    // generateResultTree(filteredDataList);
    console.log("search keyword", keyword, resultTree);
}

test1("101", "id");
test1("201", ["id", "name"])
test1("03", ["id", "name"])