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

function searchTree(node, keyword, singlePath, result) {
    singlePath.push(node);

    if (node.name.includes(keyword)) {
        //result.push(singlePath) // 不确定这样行不行
        let tmpPah = []
        for (let n of singlePath) {
            tmpPah.push(n)
        }
        result.push(tmpPah)

        singlePath.pop()
        // 问题：找到了，就不再继续找子节点了
        return;
    }

    if(node.children && node.children.length > 0) {
        for(let nd of node.children) {
          searchTree(nd, keyword, singlePath, result);
        }
    } 

    singlePath.pop() //确认有没有数组有没有pop方法
}

function test(arr) {
  let result = [];
  let singlePath = [];

  for(let i in arr) {
    searchTree(arr[i], "101", singlePath,result);
  }

  console.log("RESULT", result);
  console.log("singlePath", singlePath)
  return result;
}

test(jsonObject)