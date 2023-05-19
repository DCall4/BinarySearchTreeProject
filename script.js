function node(data) {
    return {
        data: data,
        left: null,
        right: null
    };
};

function merge(left, right) {
    let sortedArray = [];
    while (left.length > 0 && right.length > 0) {
        left[0] > right[0]
        ? sortedArray.push(right.shift())
        : sortedArray.push(left.shift());
    }
    return [...sortedArray, ...left, ...right];
};

function mergeSort(array) {
    if (array.length < 2) return array;
    else {
        let mid = Math.floor(array.length / 2);
        let leftHalf = array.slice(0, mid);
        let rightHalf = array.slice(mid);
        return merge(mergeSort(leftHalf), mergeSort(rightHalf));
    };
};

function removeDuplicates(array) {
    let uniqueArray = [...new Set(array)];
    return uniqueArray;
}

function tree(array) {
    let sortedArray = mergeSort(removeDuplicates(array));

    function buildTree(array, start, end) {
        if (start > end) return null;

        let mid = Math.floor((start + end) / 2);
        let root = node(array[mid]);

        root.left = buildTree(array, start, mid - 1);
        root.right = buildTree(array, mid +1, end);
        return root;
    };

    let root = buildTree(sortedArray, 0, sortedArray.length - 1);

    function insertNode(value, root = this.root) {
        if (root === null) {
            return node(value);
        };

        if (value < root.data) {
            root.left = insertNode(value, root.left);
        } else if (value > root.data) {
            root.right = insertNode(value, root.right);
        } else if (value == root.data) {
            console.log("Value already in Tree, cannot add a duplicate")
        }
        return root;
    };

    function deleteNode(value, root = this.root) {
        if (root === null) return root;

        if(value < root.data) {
            root.left = deleteNode(value, root.left);
        } else if(value > root.data) {
            root.right = deleteNode(value, root.right);
        } else if (value == root.data) {
            if(root.left === null){
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }
            //if there are two children find successor
            root.data = findLowest(root.right);
            //for two children delete the successor
            root.right = deleteNode(root.data, root.right);
        };
        return root;
    }

    function findLowest(node) {
        let lowFinder = node.data;
        //look for lowest value in tree or subtree
        while (node.left != null) {
            lowFinder = node.left.data;
            node = node.left;
        }
        return lowFinder;
    }

    function findNode(value, root = this.root) {
        if(root === null) return false;
        if(root.data == value) return root;
        else if(root.data > value) {
            return findNode(value, root.left)
        } else if (root.data < value) {
            return findNode(value, root.right)
        }
        return root;
    };

    function levelOrder(func) {
        if(root == null) return [];

        let queue = [root];
        let breadthResult = [];
        while(queue.length > 0) {
            let node = queue.shift();
            if(node.left !== null) queue.push(node.left);
            if(node.right !== null) queue.push(node.right);
            if (func) func(node);
            else breadthResult.push(node.data);
        }
        return breadthResult;
    };

    function preOrder(root = this.root, preOrderData = [], func) {
        if(root === null) return [];
        preOrderData.push(root.data);
        console.log(root.data);
        if(root.left !== null) preOrder(root.left, preOrderData, func);
        if(root.right !== null) preOrder(root.right, preOrderData, func);
        if(func){
            for(i = 0;i < preOrderData.length; i++) {
                func(preOrderData[i]);
            }
        } else {
            return preOrderData;
        }
    };

    function inOrder(root = this.root, inOrderData = [], func) {
        if(root === null) return [];
        if(root.left !== null) inOrder(root.left, inOrderData, func);
        inOrderData.push(root.data);
        if(root.right !== null) inOrder(root.right, inOrderData, func);
        if(func) {
            for(i = 0;i < inOrderData.length; i++) {
                func(inOrderData[i]);
            }
        } else {
            return inOrderData;
        }
    }

    function postOrder(root = this.root, postOrderData = [], func) {
        if(root === null) return [];
        if(root.left !== null) postOrder(root.left, postOrderData, func);
        if(root.right !== null) postOrder(root.right, postOrderData, func);
        postOrderData.push(root.data);
        if(func) {
            for(i = 0;i < preOrderData.length; i++) {
                func(postOrderData[i]);
            }
        } else {
            return postOrderData;
        }
    };

    function height(node, root = this.root) {
        if (node === null) return 0;
        return Math.max(height(node.left), height(node.right)) + 1;
    }

    function depth(node, root = this.root, level = -1) {
        if(!node) return null;
        if(root === null) return -1;
        if(root === node ||depth(root.left, node, level) >= 0 || 
        depth(root.right, node, level) >= 0) {
            return level ++;
        }
        return level;
    };

    function isBalanced(root = this.root) {
        if(root === null) return true;
        if(Math.abs(height(root.left) - height(root.right)) <= 1 && 
            isBalanced(root.left) === true &&
            isBalanced(root.right) === true) {
                return true
            } else {
                return false
            }
    };

    function reBalance(node) {
        if(isBalanced(node)) return node;
        else {
            let array = mergeSort(removeDuplicates(inOrder(root)));
            return buildTree(array, 0, array.length - 1)
        }
    };

    return {
        buildTree,
        root,
        insertNode,
        deleteNode,
        findLowest,
        findNode,
        levelOrder,
        preOrder,
        inOrder,
        postOrder,
        height,
        depth,
        isBalanced,
        reBalance
    }
    
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };