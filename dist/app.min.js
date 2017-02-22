e = document.createElement('input');
e.style = 'position:fixed;z-index:9;top:0;padding:5px;width:99%;';
e.placeholder = 'PASTE HERE';
b.appendChild(e);
e.onchange = rr;
rr();

function rr(j) {
    p = Math.PI / 180;
    if (j) {
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
    o = [a.width * j.orig.x, a.height * j.orig.y];
    r = pr(j.rules);
    z = cc(j.angle * p);
    k = grow(j.start, r, j.n);
    h = z(k);
    c.save();
    c.clearRect(0, 0, a.width, a.height);
    ds(j.step, j.dir * p);
    c.restore();
}

function grow(a, r, n) {
    if (!n) return a;
    y = a.split('').map(function(v) {
        return r[v] ? r[v] : v;
    }).join('');
    return grow(y, r, n - 1);
}

function pr(arr) {
    return arr.reduce(function(acc, s) {
        x = s.split('=');
        acc[x[0]] = x[1];
        return acc;
    }, {});
}

function cc(rad) {
    return function(rule) {
        w = {
            '+': {
                a: rad,
                m: 0,
                d: 0
            },
            '-': {
                a: rad * -1,
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

function ds(step, initDir) {
    c.translate(o[0], o[1]);
    c.beginPath();
    c.rotate(initDir);
    for (i = 0, l = h.length; i < l; i++) {
        g = h[i];
        c.rotate(g.a);
        if (g.m) {
            m = g.d ? 'lineTo' : 'moveTo';
            c[m](step, 0);
            c.translate(step, 0);
        }
    }
    c.stroke();
}
