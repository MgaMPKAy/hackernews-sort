(function () {
    var table = document.getElementsByClassName("itemlist")[0];

    if (!table) {
        return;
    }

    var iterator = document.createNodeIterator(table, NodeFilter.SHOW_ELEMENT, {
        acceptNode: function (node) {
            return (node.tagName == "TR") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }

    }, false);

    var nodeList = [];

    var node = iterator.nextNode();

    while (node) {
        nodeList.push(node);
        node = iterator.nextNode();
    }

    var entryList = [];

    for (var i = 0; i < nodeList.length;) {
        if (nodeList[i].className != 'athing') {
            i += 1;
            continue;
        }
        var entry = {
            athingTr: nodeList[i],
            pointTr: nodeList[i + 1],
            spacerTr: nodeList[i + 2],
            score: parseInt(/\d+/.exec(nodeList[i + 1].querySelector('.score').innerHTML)[0])
        }

        entryList.push(entry);
        nodeList[i].remove();
        nodeList[i + 1].remove();
        nodeList[i + 2].remove();
        i += 3;

    }

    entryList = entryList.sort(function (a, b) {

        return b.score - a.score;

    });

    var tbody = table.childNodes[1];
    var morespace = document.querySelector(".morespace");

    entryList.forEach(function (elem) {
        tbody.insertBefore(elem.athingTr, morespace);
        tbody.insertBefore(elem.pointTr, morespace);
        tbody.insertBefore(elem.spacerTr, morespace);
    });
})();