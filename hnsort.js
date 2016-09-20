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
        var elems = [];
        while (nodeList[i].className != "spacer") {
            elems.push(nodeList[i]);
            nodeList[i].remove();
            i++;
        }
        elems.push(nodeList[i++]);

        var score = 0;
        var scoreElem = elems[1].querySelector('.score');
        if (scoreElem) {
            score = parseInt(/\d+/.exec(scoreElem.innerHTML)[0])
        }

        var entry = {
            elems: elems,
            score: score
        }
        entryList.push(entry);
    }

    entryList = entryList.sort(function (a, b) {
        return b.score - a.score;
    });

    var tbody = table.childNodes[1];
    var morespace = document.querySelector(".morespace");

    entryList.forEach(function (entry) {
        entry.elems.forEach(function(elem) {
            tbody.insertBefore(elem, morespace);
        });
    });
})();