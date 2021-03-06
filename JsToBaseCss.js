Array.prototype.unique = function() {
    var result = [],
        hash = {};
    for (var i = 0, elem;
        (elem = this[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
};
$(document).ready(function() {
    var start = new Date().getMilliseconds();
    var ca = [];
    var rule = {
        '^bg-(\\w*)$': ["background-color:#{$$}"],
        '^color-(\\w*)$': ["color:#{$$}"],
        '^ml-(\\w*)$': ["margin-left:{$$}px"],
        '^mr-(\\w*)$': ["margin-right:{$$}px"],
        '^mt-(\\w*)$': ["margin-top:{$$}px"],
        '^mb-(\\w*)$': ["margin-bottom:{$$}px"],
        '^padding-(\\w*)$': ["padding:{$$}px"],
        '^pl-(\\w*)$': ["padding-left:{$$}px"],
        '^pr-(\\w*)$': ["padding-right:{$$}px"],
        '^pt-(\\w*)$': ["padding-top:{$$}px"],
        '^pb-(\\w*)$': ["padding-bottom:{$$}px"],
        '^fs-(\\w*)$': ["font-size:{$$}px"],
    };
    $("body").append($("<style/>").attr("class", "insetstyle"));
    $("*").each(function() {
        var c = $(this).attr("class");
        if (c == undefined) {
            return true;
        }
        if (c.indexOf(" ") >= 0) {
            ca = ca.concat(c.split(" "));
        } else {
            ca.push(c);
        }
    });
    var classstr = ca.unique().join("\n");
    for (var key in rule) {
        if (rule.hasOwnProperty(key)) {
            var element = rule[key];
            var Re = new RegExp(key, "gm");
            while ((rs = Re.exec(classstr)) != null) {
                var style = "." +
                    rs[0] +
                    "{" +
                    element[0].replace("{$$}", rs[1]) +
                    "}";
                $(".insetstyle").append(style);
            }
        }
    }　　
    var end = new Date().getMilliseconds();　　
    console.log(end - start);
});