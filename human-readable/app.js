var element = document.createElement('div');
element.innerHTML = '<input style="position:fixed;z-index:9;top:0;width:99%;" placeholder="paste here">';
b.appendChild(element);
element.querySelector('input').onchange = run;

run();

function run(j) {
    var rad =  Math.PI/180;
    if ( j ) {
        try {
            j = JSON.parse(j.target.value);
        } catch (e) {}
    }else {
        j = {
            step: 5,
            dir: 0,
            start: 'F',
            n: 5,
            angle: 90,
            orig: {
                x: 0,
                y: 0
            },
            rules: ['F=F+F-F-F+F']
        };
    }
    var origin = [a.width * j.orig.x, a.height * j.orig.y],
        rules = parseRules(j.rules),
        compile = createCompiler(j.angle * rad),
        result = grow(j.start, rules, j.n),
        actions = compile(result);
    c.save();
    c.clearRect(0, 0, a.width, a.height);
    drawScene(actions, j.step, origin, j.dir * rad);
    c.restore();
}

function grow(a, r, n) {
    if (!n) return a;
    var result = a.split('').map(function(v) {
        return r[v] ? r[v] : v;
    }).join('');
    return grow(result, r, n - 1);
}

function parseRules(arr) {
    return arr.reduce(function(acc, s) {
        var rule = s.split('=');
        acc[rule[0]] = rule[1];
        return acc;
    }, {});
}

function createCompiler(rad) {
    var negRad = rad * -1;
    return function(rule) {
        var actions = {
            '+': {
                angle: rad,
                move: 0,
                draw: 0
            },
            '-': {
                angle: negRad,
                move: 0,
                draw: 0
            },
            'F': {
                angle: 0,
                move: 1,
                draw: 1
            },
            'G': {
                angle: 0,
                move: 1,
                draw: 1
            },
            'M': {
                angle: 0,
                move: 1,
                draw: 0
            }
        };
        return rule.split('').map(function(v) {
            return actions[v] ? actions[v] : v;
        });
    };
}

function drawScene(acts, step, orig, initDir) {
    c.translate(orig[0], orig[1]);
    c.beginPath();
    c.rotate(initDir);
    for (var act, action, i = 0, l = acts.length; i < l; i++) {
        act = acts[i];
        c.rotate(act.angle);
        if (act.move) {
            action = act.draw ? 'lineTo' : 'moveTo';
            c[action](step, 0);
            c.translate(step, 0);
        }
    }
    c.stroke();
}
