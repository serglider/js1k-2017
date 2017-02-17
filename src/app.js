e = document.createElement('div');
e.innerHTML = '<input style="position:fixed;z-index:9;top:0;width:99%;" placeholder="paste here">';
b.appendChild(e);
e.querySelector('input').onchange = function(e) {
    try {
        j = JSON.parse(e.target.value);
        p = Math.PI/180;
        o = [a.width * j.orig.x, a.height * j.orig.y],
        r = parseRules(j.rules),
        z = createCompiler(j.angle*p),
        k = grow(j.start, r, j.n),
        h = z(k);
        c.save();
        c.clearRect(0, 0, a.width, a.height);
        drawScene(h, j.step, o, j.dir*p);
        c.restore();
    } catch (e) {}
};

function grow(a, r, n) {
    if (!n) return a;
    y = a.split('').map(function(v) {
        return r[v] ? r[v] : v;
    }).join('');
    return grow(y, r, n - 1);
}

function parseRules(arr) {
    return arr.reduce(function(acc, s) {
        x = s.split('=');
        acc[x[0]] = x[1];
        return acc;
    }, {});
}

function createCompiler(rad) {
    u = rad * -1;
    return function(rule) {
        w = {
            '+': {
                a: rad,
                m: 0,
                d: 0
            },
            '-': {
                a: u,
                m: 0,
                d: 0
            },
            'F': {
                a: 0,
                m: 1,
                d: 1
            },
            'G': {
                a: 0,
                m: 1,
                d: 1
            },
            'M': {
                a: 0,
                m: 1,
                d: 0
            }
        };
        return rule.split('').map(function(v) {
            return w[v] ? w[v] : v;
        });
    };
}

function drawScene(acts, step, orig, initDir) {
    c.translate(orig[0], orig[1]);
    c.beginPath();
    c.rotate(initDir);
    for (i = 0, l = acts.length; i < l; i++) {
        if ( i > 120000 ) {
            c.stroke();
            return;
        }
        g = acts[i];
        c.rotate(g.a);
        if (g.m) {
            m = g.d ? 'lineTo' : 'moveTo';
            c[m](step, 0);
            c.translate(step, 0);
        }
    }
    c.stroke();
}
