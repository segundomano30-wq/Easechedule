const P = {
    plus: '<path d="M12 5v14M5 12h14"/>', dh: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>', pal: '<path d="M12 3a9 9 0 100 18c1.6 0 2-1.2 1.3-2.2-.7-1 0-2.3 1.3-2.3H17a4 4 0 004-4c0-5-4-9.5-9-9.5z"/><circle cx="7.5" cy="11" r="1"/><circle cx="11" cy="7" r="1"/><circle cx="15.5" cy="8" r="1"/>', help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 015 .5c0 1.5-2.5 2-2.5 3.5M12 17h.01"/>', out: '<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>', logo: '<path d="M20 12V7a3 3 0 00-3-3H6a3 3 0 00-3 3v11a3 3 0 003 3h6"/><path d="M8 2v4M16 2v4M3 10h17"/><path d="m16 19 2 2 4-4"/>', user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>', lock: '<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V7a4 4 0 018 0v4M12 15v2"/>', mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>', at: '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-4 8"/>', bell: '<path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4"/>', home: '<path d="M3 11l9-8 9 8M5 10v11h14V10"/>', tasks: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', cal: '<rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>', calp: '<rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4"/>', listp: '<path d="M3 6h12M3 12h8M3 18h8M17 14v6M14 17h6"/>', back: '<path d="m15 18-6-6 6-6"/>', next: '<path d="m9 18 6-6-6-6"/>', dots: '<circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/>'
};
const ic = (n, s = 24) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${P[n]}</svg>`;
const $ = s => document.querySelector(s), esc = s => String(s).replace(/[&<>"]/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'
}[c]));
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const today = iso(new Date()), dd = n => {
    const x = new Date();
    x.setDate(x.getDate() + n);
    return iso(x);
};
const t12 = t => {
    let [h, m] = t.split(':').map(Number);
    return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
};
const mins = t => {
    let [h, m] = t.split(':').map(Number);
    return h * 60 + m;
};
const COL = ['#6154a4', '#147d6c', '#a6662c'];
let S = {
    users: [{
            name: 'Jeff', email: 'jeff@example.com', username: 'jeff', pw: 'ease123'
        }], user: null,
    events: [{
            id: 1, title: 'Class - Web Development', date: today, start: '08:00', end: '10:00'
        }, {
            id: 2, title: 'Lunch Break', date: today, start: '12:00', end: '13:00'
        }, {
            id: 3, title: 'IT Project Meeting', date: today, start: '15:00', end: '16:00'
        }],
    tasks: [{
            id: 1, title: 'Finish project report', done: false, due: dd(2)
        }, {
            id: 2, title: 'Study for exam', done: false, due: dd(5)
        }, {
            id: 3, title: 'Buy groceries', done: false, due: dd(7)
        }, {
            id: 4, title: 'Read a book', done: false, due: dd(9)
        }]
};
try {
    const x = JSON.parse(localStorage.getItem('ease') || 'null');
    if (x && x.users)
        S = x;
}
catch (e) {
}
const save = () => {
    try {
        localStorage.setItem('ease', JSON.stringify(S));
    }
    catch (e) {
    }
};
const toast = m => {
    const t = $('#toast');
    t.textContent = m;
    t.style.opacity = 1;
    clearTimeout(toast.t);
    toast.t = setTimeout(() => t.style.opacity = 0, 2000);
};
const evs = d => S.events.filter(e => e.date === d).sort((a, b) => mins(a.start) - mins(b.start));
const evHTML = l => l.length ? l.map((e, i) => `<div class="ev"><i style="background:${COL[i % 3]}"></i><div><b>${esc(e.title)}</b><span>${t12(e.start)} - ${t12(e.end)}</span></div></div>`).join('') : '<div class="empty">Nothing scheduled</div>';
const field = (id, ph, icn, type = 'text') => {
    const pk = type === 'date' || type === 'time';
    return `<div class="field${pk ? ' pk' : ''}">${pk ? `<div class="v" id="${id}v">${ph}</div><input id="${id}" type="${type}" onchange="pv(this,'${ph}')" onclick="try{this.showPicker()}catch(e){}">` : `<input id="${id}" type="${type}" placeholder="${ph}" autocomplete="off">`}<span class="i">${ic(icn, 22)}</span></div>`;
};
function pv(i, ph) {
    const v = $('#' + i.id + 'v');
    v.classList.toggle('set', !!i.value);
    v.textContent = !i.value ? ph : i.type === 'date' ? new Date(i.value + 'T00:00').toLocaleDateString('en', {
        month: 'short', day: 'numeric', year: 'numeric'
    }) : t12(i.value);
}
let cal = {
    y: new Date().getFullYear(), m: new Date().getMonth(), sel: today
};
const V = {
    splash() {
        setTimeout(() => {
            const b = $('.bar i');
            if (b)
                b.style.width = '100%';
        }, 60);
        setTimeout(() => {
            if ($('.bar'))
                go(S.user ? 'home' : 'login');
        }, 2300);
        return `<div class="c1"></div><div class="c2"></div><div style="position:relative;height:100%;display:flex;flex-direction:column;justify-content:center;padding-bottom:46px"><div class="logo" style="width:80px;height:80px;border-radius:22px">${ic('logo', 40)}</div><div class="brand" style="margin-top:27px">EASECHEDULE</div><p style="text-align:center;color:var(--mut);font-size:16px;line-height:27px;margin-top:24px">Plan today,<br>achieve tomorrow.</p><div class="bar"><i></i></div></div>`;
    },
    login() {
        return `<div class="s" style="padding-top:88px"><div class="logo">${ic('logo', 32)}</div><div class="brand">EASECHEDULE</div><p class="sub">Welcome back!<br>Login to continue.</p>${field('u', 'Email or Username', 'user')}${field('p', 'Password', 'lock', 'password')}<div style="text-align:right;margin-top:-4px"><button class="link" style="font-size:12px;line-height:16px" onclick="toast('Password reset is not part of this prototype')">Forgot password?</button></div><button class="btn" onclick="login()" style="margin-top:17px">Log In</button><p class="small">Don’t have an account? <button class="link" onclick="go('register')">Sign Up</button></p></div>`;
    },
    register() {
        return `<div class="s" style="padding-top:64px"><div class="logo">${ic('logo', 32)}</div><div class="brand" style="margin-top:21px">EASECHEDULE</div><p class="sub" style="line-height:24px;margin:19px 0 29px">Create your account<br>and get started.</p>${['n|Full Name|user', 'm|Email|mail|email', 'u|Username|at', 'p|Password|lock|password'].map(f => {
            f = f.split('|');
            return field(f[0], f[1], f[2], f[3]);
        }).join('').replace(/class="field"/g, 'class="field" style="margin-bottom:16px"')}<button class="btn" onclick="register()" style="margin-top:25px">Sign Up</button><p class="small" style="margin-top:20px">Already have an account? <button class="link" onclick="go('login')">Log In</button></p></div>`;
    },
    home() {
        const h = new Date().getHours(), g = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
        return `<div class="s" style="padding-top:40px"><div style="color:var(--mut);font-size:15px;line-height:20px">${g},</div><div style="font-size:30px;line-height:38px;font-weight:800;margin-top:6px">${esc(S.user.name.split(' ')[0])} ${h < 18 ? '☀️' : '🌙'}</div><button class="bell" onclick="toast('No new notifications')">${ic('bell', 22)}</button>
 <div class="card" style="margin-top:38px"><div class="row"><span style="font-size:17px;line-height:22px">Today’s Schedule</span><button class="link" style="font-size:12px" onclick="go('calendar')">View All ›</button></div>${evHTML(evs(today))}</div>
 <h2 style="margin-top:30px">Quick Actions</h2><div class="grid2">
 <button class="qa" onclick="go('add')">${ic('calp')}<span>Add Schedule</span></button><button class="qa" onclick="go('tasks');addTaskSheet()">${ic('listp')}<span>Add Task</span></button>
 <button class="qa" onclick="openMonth()">${ic('cal')}<span>View Calendar</span></button><button class="qa" onclick="freeTime()">${ic('clock')}<span>Find Free Time</span></button></div></div>`;
    },
    calendar() {
        const mode = cal.mode || 'day', d = new Date(cal.sel + 'T00:00'), fmt = (x, o) => x.toLocaleDateString('en', o);
        const head = `<div class="s${mode === 'day' ? ' cs' : ''}" style="padding-top:38px;padding-bottom:100px"><div class="row" style="height:36px"><h2>My Schedule</h2><button class="sq" onclick="toast('No new notifications')">${ic('bell', 18)}</button></div><div class="seg"><button class="${mode === 'day' ? 'on' : ''}" onclick="setMode('day')">Day</button><button class="${mode === 'week' ? 'on' : ''}" onclick="setMode('week')">Week</button></div>`;
        const ov = `<input class="ov" type="date" value="${cal.sel}" onchange="pickDate(this.value)" onclick="try{this.showPicker()}catch(e){}">`;
        if (mode === 'day') {
            const list = evs(cal.sel), B = 6, H = 16, cols = [];
            const ovl = (a, b) => mins(a.start) < mins(b.end) && mins(b.start) < mins(a.end);
            list.forEach((e, i) => {
                let c = 0;
                while (cols.some(x => x.c === c && ovl(x.e, e)))
                    c++;
                cols.push({
                    e, c, i
                });
            });
            let rows = '';
            for (let h = B; h < B + H; h++)
                rows += `<div class="hr"><span>${t12(h + ':00').replace(':00', '')}</span><i></i></div>`;
            const blocks = cols.map(x => {
                const n = Math.max(...cols.filter(y => ovl(y.e, x.e)).map(y => y.c + 1)), t = (mins(x.e.start) - B * 60) * .8, h = Math.max(28, (mins(x.e.end) - mins(x.e.start)) * .8 - 4);
                return `<div class="eb" style="--c:var(--c${x.i % 3});top:${t + 2}px;height:${h}px;left:${x.c * 100 / n}%;width:calc(${100 / n}% - 4px)"><b>${esc(x.e.title)}</b><span>${t12(x.e.start)} - ${t12(x.e.end)}</span></div>`;
            }).join('');
            const nm = new Date().getHours() * 60 + new Date().getMinutes(), now = cal.sel === today && nm >= B * 60 && nm < (B + H) * 60 ? `<div class="now" style="top:${(nm - B * 60) * .8}px"></div>` : '';
            return head + `<div class="dn"><button class="a" onclick="shift(-1)">${ic('back', 18)}</button><div class="t">${fmt(d, {
                weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
            })}${ov}</div><button class="a" onclick="shift(1)">${ic('next', 18)}</button></div><div class="tws"><div class="tl" style="height:${H * 48}px">${rows}<div class="evl">${blocks}${now}</div></div></div></div>`;
        }
        const st = new Date(d);
        st.setDate(st.getDate() - (d.getDay() + 6) % 7);
        const days = [...Array(7)].map((_, i) => {
            const x = new Date(st);
            x.setDate(st.getDate() + i);
            return x;
        }), en = days[6];
        const lists = days.map(x => evs(iso(x)));
        let lo = 8, hi = 16;
        lists.flat().forEach(e => {
            lo = Math.min(lo, Math.floor(mins(e.start) / 60));
            hi = Math.max(hi, Math.ceil(mins(e.end) / 60) - 1);
        });
        let g = '<div></div>' + days.map(x => {
            const k = iso(x);
            return `<button class="wh${k === cal.sel ? ' on' : ''}" onclick="cal.sel='${k}';go('calendar')">${fmt(x, { weekday: 'short' })}<b>${x.getDate()}</b></button>`;
        }).join('');
        for (let h = lo; h <= hi; h++) {
            g += `<div class="wl">${h < 12 ? h + 'a' : h === 12 ? '12p' : h - 12 + 'p'}</div>`;
            lists.forEach(l => {
                const i = l.findIndex(e => mins(e.start) < (h + 1) * 60 && mins(e.end) > h * 60);
                g += i < 0 ? '<div class="wc"></div>' : `<div class="wc e" style="--c:var(--c${i % 3})">${i + 1}</div>`;
            });
        }
        const sel = evs(cal.sel);
        return head + `<div class="row" style="gap:10px;margin-top:16px"><button class="chip" onclick="cal.sel=today;go('calendar')">Week</button><div class="chip pill"><button class="a" onclick="shift(-1)">${ic('back', 16)}</button><span style="position:relative">${fmt(st, { month: 'short', day: 'numeric' })} - ${fmt(en, {
            month: 'short', day: 'numeric', year: 'numeric'
        })}${ov}</span><button class="a" onclick="shift(1)">${ic('next', 16)}</button></div></div><div class="wk">${g}</div>` + (sel.length ? sel.map((e, i) => `<div class="er" style="--c:var(--c${i % 3})"><em>${i + 1}</em><b>${esc(e.title)}</b><span>${t12(e.start)} - ${t12(e.end)}</span></div>`).join('') : '<div class="empty">Nothing scheduled</div>') + '</div>';
    },
    month() {
        const f = new Date(cal.y, cal.m, 1), n = new Date(cal.y, cal.m + 1, 0).getDate();
        let c = '';
        'SMTWTFS'.split('').forEach(d => c += `<div class="w">${d}</div>`);
        for (let i = 0; i < f.getDay(); i++)
            c += '<div></div>';
        for (let d = 1; d <= n; d++) {
            const k = iso(new Date(cal.y, cal.m, d));
            c += `<button class="${k === cal.sel ? 'sel' : ''} ${k === today ? 'today' : ''}" onclick="cal.sel='${k}';go('month')">${d}${evs(k).length ? '<u></u>' : ''}</button>`;
        }
        return `<div class="s" style="padding-top:38px"><div style="display:flex;align-items:center;height:36px"><button class="link" style="margin-left:2px;display:flex" onclick="go('home')">${ic('back', 24)}</button><h2 style="flex:1;margin-left:6px">Calendar</h2></div>
 <div class="row" style="margin-top:20px"><button onclick="mvm(-1)" class="sq">${ic('back', 18)}</button><span style="font-size:16px;font-weight:700">${f.toLocaleString('en', { month: 'long', year: 'numeric' })}</span><button onclick="mvm(1)" class="sq">${ic('next', 18)}</button></div><div class="cal">${c}</div>
 <div class="card" style="margin-top:20px"><div class="row"><span style="font-size:15px;font-weight:600">${new Date(cal.sel + 'T00:00').toLocaleDateString('en', {
            weekday: 'long', month: 'short', day: 'numeric'
        })}</span><button class="link" style="font-size:12px" onclick="cal.mode='day';go('calendar')">Open in Schedule ›</button></div>${evHTML(evs(cal.sel))}</div></div>`;
    },
    tasks() {
        const l = S.tasks.filter(t => tf === 'all' || (tf === 'done' ? t.done : !t.done)).sort((a, b) => (a.due || '9') < (b.due || '9') ? -1 : 1);
        const sg = (k, n) => `<button class="${tf === k ? 'on' : ''}" onclick="tf='${k}';go('tasks')">${n}</button>`;
        return `<div class="s" style="padding-top:38px;padding-bottom:100px"><div style="display:flex;align-items:center;height:36px"><h2 style="flex:1">My Tasks</h2><button class="sq" onclick="toast('More options coming soon')">${ic('dots', 18)}</button></div>
 <div class="seg" style="margin-top:34px">${sg('all', 'All')}${sg('pending', 'Pending')}${sg('done', 'Completed')}</div>
 ${l.length ? l.map(t => `<div class="tk ${t.done ? 'done' : ''}"><button class="ring ${t.done ? 'on' : ''}" onclick="tg(${t.id})">${t.done ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"><path d="m5 12 5 5 9-10"/></svg>' : ''}</button><div style="flex:1;min-width:0"><b>${esc(t.title)}</b><span>${t.due ? 'Due: ' + new Date(t.due + 'T00:00').toLocaleDateString('en', {
            month: 'short', day: 'numeric', year: 'numeric'
        }) : 'No due date'}${t.dur ? ' · ' + fmtDur(t.dur) : ''}</span>${t.sug ? '<span style="color:var(--pri)">Suggested: ' + new Date(t.sug.date + 'T00:00').toLocaleDateString('en', { month: 'short', day: 'numeric' }) + ', ' + t12(t.sug.start) + ' - ' + t12(t.sug.end) + '</span>' : ''}</div><button class="mn" onclick="taskMenu(${t.id})">${ic('dh', 20)}</button></div>`).join('') : '<div class="empty" style="margin-top:30px">No tasks here</div>'}</div>`;
    },
    profile() {
        const u = S.user, done = S.tasks.filter(t => t.done).length;
        const row = (i, l, fn, red) => `<button class="mrow${red ? ' red' : ''}" onclick="${fn}"><span class="mi">${ic(i, 20)}</span><span style="flex:1;text-align:left">${l}</span>${red ? '' : ic('next', 18)}</button>`;
        const st = (n, l) => `<div style="flex:1;text-align:center"><div style="font-size:22px;line-height:28px;font-weight:800;color:var(--dk)">${n}</div><div style="font-size:11px;line-height:14px;color:var(--mut);margin-top:3px">${l}</div></div>`;
        return `<div class="s" style="padding-top:38px"><div style="display:flex;align-items:center;height:36px"><button class="link" style="margin-left:2px;display:flex" onclick="go('home')">${ic('back', 24)}</button><h2 style="flex:1;margin-left:6px">Profile</h2></div>
 <div class="av" style="margin-top:36px">${ic('user', 34)}</div><div style="text-align:center;font-size:22px;line-height:28px;font-weight:800;margin-top:14px">${esc(u.name)}</div><div style="text-align:center;font-size:12px;line-height:16px;color:var(--mut);margin-top:10px">${esc(u.email)}</div>
 <div class="stats" style="margin-top:26px">${st(S.events.length, 'Schedules')}${st(S.tasks.length, 'Tasks')}${st(done, 'Completed')}</div>
 ${row('user', 'My Account', 'accountSheet()')}${row('bell', 'Notifications', 'notifSheet()')}${row('pal', 'Appearance', 'appearanceSheet()')}${row('help', 'Help &amp; Support', 'helpSheet()')}${row('out', 'Log Out', "S.user=null;save();go('login')", 1)}</div>`;
    },
    add() {
        return `<div class="s" style="padding-top:38px"><div style="display:flex;align-items:center;height:36px"><button class="link" style="margin-left:2px;display:flex" onclick="go('home')">${ic('back', 24)}</button><h2 style="flex:1;margin-left:6px">Add Schedule</h2><button class="sq" onclick="toast('More options coming soon')">${ic('dots', 18)}</button></div>
 <div class="lbl" style="margin-top:36px">Activity / Title</div><div class="field" style="margin:0"><input id="a" placeholder="e.g. Class, Meeting, etc." autocomplete="off"></div><div class="lbl">Date</div>${field('d', 'Select date', 'cal', 'date').replace('class="field pk"', 'class="field pk" style="margin:0"')}<div class="lbl">Start Time</div>${field('s', 'Select time', 'clock', 'time').replace('class="field pk"', 'class="field pk" style="margin:0"')}<div class="lbl">End Time</div>${field('z', 'Select time', 'clock', 'time').replace('class="field pk"', 'class="field pk" style="margin:0"')}<button class="btn" style="margin-top:25px" onclick="addEv()">Save</button></div>`;
    },
    addtask() {
        const lb = (t, first) => `<div class="lbl"${first ? ' style="margin-top:36px"' : ''}>${t}</div>`;
        const plain = h => h.replace('class="field"', 'class="field" style="margin:0"');
        const pick = h => h.replace('class="field pk"', 'class="field pk" style="margin:0"');
        return `<div class="s" style="padding-top:38px"><div style="display:flex;align-items:center;height:36px"><button class="link" style="margin-left:2px;display:flex" onclick="go('tasks')">${ic('back', 24)}</button><h2 style="flex:1;margin-left:6px">Add Task</h2><button class="sq" onclick="toast('More options coming soon')">${ic('dots', 18)}</button></div>
 ${lb('Task Name', 1)}<div class="field" style="margin:0"><input id="t" placeholder="e.g. Finish project report" autocomplete="off"></div>
 ${lb('Duration')}${plain(field('tdur', 'e.g. 2 hours', 'clock'))}
 ${lb('Deadline')}${pick(field('td', 'Select date', 'cal', 'date'))}
 <div style="background:var(--tint);border-radius:16px;padding:16px;display:flex;align-items:center;gap:12px;margin-top:26px"><div style="flex:1"><div style="font-size:14px;line-height:18px;font-weight:700;color:var(--ink)">Get Suggested Time</div><div style="font-size:11px;line-height:14px;color:var(--mut);margin-top:6px">The system will check your schedule.</div></div><button class="sw on" id="sg" onclick="this.classList.toggle('on')"></button></div>
 <button class="btn" style="margin-top:24px" onclick="saveTask()">Save</button></div>`;
    }
};
const TABS = [['home', 'Home', 'home'], ['calendar', 'Schedule', 'cal'], ['tasks', 'Tasks', 'tasks'], ['profile', 'Profile', 'user']];
function go(s, focus) {
    if (!S.user && !['splash', 'login', 'register'].includes(s))
        s = 'login';
    const v = $('#view');
    v.innerHTML = V[s]();
    v.scrollTop = 0;
    const nv = $('#nav'), show = !['splash', 'login', 'register'].includes(s);
    nv.hidden = !show;
    const on = s === 'add' ? 'calendar' : s === 'month' ? 'home' : s === 'addtask' ? 'tasks' : s;
    nv.innerHTML = TABS.map(t => `<button class="${t[0] === on ? 'on' : ''}" onclick="go('${t[0]}')"><span class="p">${ic(t[2], 22)}</span>${t[1]}</button>`).join('');
    document.querySelectorAll('.fab').forEach(x => x.remove());
    if (s === 'calendar' || s === 'tasks') {
        const f = document.createElement('button');
        f.className = 'fab';
        f.innerHTML = ic('plus', 26);
        f.onclick = s === 'tasks' ? addTaskSheet : () => {
            go('add');
            const i = $('#d');
            i.value = cal.sel;
            pv(i, 'Select date');
        };
        $('#app').appendChild(f);
        f.style.bottom = (nv.offsetHeight + 16) + 'px';
        const w = $('.tws');
        if (w) {
            const e = evs(cal.sel)[0];
            w.scrollTop = Math.max(0, ((e ? mins(e.start) : 420) - 360) * .8 - 40);
        }
    }
    if (focus && $('#t'))
        $('#t').focus();
}
function openMonth() {
    cal.y = +cal.sel.slice(0, 4);
    cal.m = +cal.sel.slice(5, 7) - 1;
    go('month');
}
function mvm(d) {
    cal.m += d;
    if (cal.m < 0) {
        cal.m = 11;
        cal.y--;
    }
    if (cal.m > 11) {
        cal.m = 0;
        cal.y++;
    }
    go('month');
}
let tf = 'all';
const closeSheet = () => document.querySelectorAll('.sheet').forEach(x => x.remove());
function sheet(h) {
    closeSheet();
    const d = document.createElement('div');
    d.className = 'sheet';
    d.onclick = e => {
        if (e.target === d)
            d.remove();
    };
    d.innerHTML = '<div>' + h + '</div>';
    $('#app').appendChild(d);
}
function addTaskSheet() {
    go('addtask');
}
function parseDur(s) {
    s = s.toLowerCase();
    let m = 0, found = false;
    s.replace(/(\d+(?:\.\d+)?)\s*(hours?|hrs?|h|minutes?|mins?|m)\b/g, (_, n, u) => {
        found = true;
        m += parseFloat(n) * (u[0] === 'h' ? 60 : 1);
    });
    if (!found && /^\s*\d+(\.\d+)?\s*$/.test(s))
        m = parseFloat(s) * 60;
    return Math.round(m);
}
function fmtDur(m) {
    const h = Math.floor(m / 60), r = m % 60;
    return (h ? h + ' hr' : '') + (h && r ? ' ' : '') + (r ? r + ' min' : '');
}
const hhmm = m => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
function findSlot(dur, due) {
    const now = new Date(), nowM = Math.ceil((now.getHours() * 60 + now.getMinutes()) / 15) * 15;
    const last = due && due >= today ? due : dd(7);
    for (let d = new Date(today + 'T00:00'); iso(d) <= last; d.setDate(d.getDate() + 1)) {
        const k = iso(d);
        const busy = evs(k).map(e => [mins(e.start), mins(e.end)])
            .concat(S.tasks.filter(t => !t.done && t.sug && t.sug.date === k).map(t => [mins(t.sug.start), mins(t.sug.end)]))
            .sort((x, y) => x[0] - y[0]);
        let c = Math.max(8 * 60, k === today ? nowM : 0);
        for (const [s, e] of busy) {
            if (s - c >= dur)
                return { date: k, start: hhmm(c), end: hhmm(c + dur) };
            c = Math.max(c, e);
        }
        if (18 * 60 - c >= dur)
            return { date: k, start: hhmm(c), end: hhmm(c + dur) };
    }
    return null;
}
function saveTask() {
    const t = $('#t').value.trim(), due = $('#td').value, ds = $('#tdur').value.trim(), want = $('#sg').classList.contains('on');
    if (!t) {
        toast('Enter a task name');
        return;
    }
    const dur = ds ? parseDur(ds) : 0;
    if (ds && !dur) {
        toast('Duration like "2 hours" or "90 min"');
        return;
    }
    if (want && !dur) {
        toast('Enter a duration to get a suggested time');
        return;
    }
    const task = { id: Date.now(), title: t, done: false, due: due };
    if (dur)
        task.dur = dur;
    let msg = 'Task added';
    if (want) {
        const slot = findSlot(dur, due);
        if (slot) {
            task.sug = slot;
            msg = 'Suggested ' + new Date(slot.date + 'T00:00').toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' }) + ', ' + t12(slot.start);
        } else {
            msg = 'Task added - no free slot found';
        }
    }
    S.tasks.push(task);
    save();
    go('tasks');
    toast(msg);
}
function taskMenu(id) {
    const t = S.tasks.find(x => x.id === id);
    sheet(`<div class="row" style="margin-bottom:16px"><h2 style="font-size:17px">${esc(t.title)}</h2><button class="x" onclick="closeSheet()">×</button></div><button class="btn" style="background:var(--card);color:var(--pri);border:1px solid var(--line)" onclick="closeSheet();tg(${id})">Mark as ${t.done ? 'pending' : 'completed'}</button><button class="btn" style="margin-top:12px;background:var(--card);color:#c0392b;border:1px solid var(--line)" onclick="closeSheet();rm(${id})">Delete</button>`);
}
const sh = t => `<div class="row" style="margin-bottom:8px"><h2>${t}</h2><button class="x" onclick="closeSheet()">×</button></div>`;
const applyTheme = () => {
    document.documentElement.dataset.theme = S.theme === 'dark' ? 'dark' : 'light';
};
function accountSheet() {
    const u = S.user;
    sheet(sh('My Account') + `<div class="lbl" style="margin-top:14px">Full name</div>${field('an', 'Full name', 'user')}<div class="lbl" style="margin-top:0">Email</div>${field('ae', 'Email', 'mail', 'email')}<div class="small" style="margin:-8px 0 16px;text-align:left">Username: @${esc(u.username)}</div><button class="btn" onclick="saveAcct()">Save</button>`);
    $('#an').value = u.name;
    $('#ae').value = u.email;
}
function saveAcct() {
    const n = $('#an').value.trim(), e = $('#ae').value.trim();
    if (!n || !e) {
        toast('Name and email are required');
        return;
    }
    [S.user, ...S.users.filter(x => x.username === S.user.username)].forEach(x => {
        x.name = n;
        x.email = e;
    });
    save();
    closeSheet();
    go('profile');
    toast('Profile updated');
}
function notifSheet() {
    const n = S.notif || (S.notif = { s: true, t: true }), r = (k, l) => `<div class="opt" style="font-weight:500"><span>${l}</span><button class="sw ${n[k] ? 'on' : ''}" onclick="S.notif.${k}=!S.notif.${k};save();notifSheet()"></button></div>`;
    sheet(sh('Notifications') + r('s', 'Schedule reminders') + r('t', 'Task due dates'));
}
function appearanceSheet() {
    const t = S.theme === 'dark' ? 'dark' : 'light', o = (k, l) => `<button class="opt ${t === k ? 'on' : ''}" onclick="setTheme('${k}')"><span>${l}</span>${t === k ? ic('tasks', 20) : ''}</button>`;
    sheet(sh('Appearance') + o('light', 'Light') + o('dark', 'Dark'));
}
function setTheme(t) {
    S.theme = t;
    save();
    applyTheme();
    appearanceSheet();
}
function helpSheet() {
    sheet(sh('Help &amp; Support') + `<div class="card" style="margin-top:10px;font-size:13px;line-height:20px;color:var(--ink)"><b>Add a schedule:</b> use Add Schedule on Home, or the + button on the Schedule tab.<br><br><b>Switch views:</b> Day and Week are at the top of Schedule.<br><br><b>Find a gap:</b> Find Free Time on Home shows open slots today.<br><br><b>Tasks:</b> tap the circle to complete one, or ••• for more.</div>`);
}
function setMode(m) {
    cal.mode = m;
    go('calendar');
}
function pickDate(v) {
    if (v) {
        cal.sel = v;
        go('calendar');
    }
}
function shift(n) {
    const x = new Date(cal.sel + 'T00:00');
    x.setDate(x.getDate() + n * ((cal.mode || 'day') === 'week' ? 7 : 1));
    cal.sel = iso(x);
    go('calendar');
}
function login() {
    const u = $('#u').value.trim().toLowerCase(), p = $('#p').value, a = S.users.find(x => (x.username.toLowerCase() === u || x.email.toLowerCase() === u) && x.pw === p);
    if (!a) {
        toast('Incorrect email/username or password');
        return;
    }
    S.user = a;
    save();
    go('home');
}
function register() {
    const n = $('#n').value.trim(), m = $('#m').value.trim(), u = $('#u').value.trim(), p = $('#p').value;
    if (!n || !m || !u || p.length < 6) {
        toast('Fill every field (password: 6+ characters)');
        return;
    }
    if (S.users.some(x => x.username.toLowerCase() === u.toLowerCase() || x.email.toLowerCase() === m.toLowerCase())) {
        toast('Username or email already in use');
        return;
    }
    const a = {
        name: n, email: m, username: u, pw: p
    };
    S.users.push(a);
    S.user = a;
    save();
    go('home');
    toast('Account created');
}
function addEv() {
    const t = $('#a').value.trim(), d = $('#d').value, s = $('#s').value, z = $('#z').value;
    if (!t || !d || !s || !z) {
        toast('Please complete all fields');
        return;
    }
    if (mins(z) <= mins(s)) {
        toast('End time must be after start time');
        return;
    }
    S.events.push({
        id: Date.now(), title: t, date: d, start: s, end: z
    });
    save();
    cal.sel = d;
    cal.y = +d.slice(0, 4);
    cal.m = +d.slice(5, 7) - 1;
    go('calendar');
    toast('Schedule saved');
}
function addTask() {
    const t = $('#t').value.trim();
    if (!t)
        return;
    S.tasks.unshift({
        id: Date.now(), title: t, done: false
    });
    save();
    go('tasks', 1);
}
const tg = id => {
    const t = S.tasks.find(x => x.id === id);
    t.done = !t.done;
    save();
    go('tasks');
};
const rm = id => {
    S.tasks = S.tasks.filter(x => x.id !== id);
    save();
    go('tasks');
};
function mv(d) {
    cal.m += d;
    if (cal.m < 0) {
        cal.m = 11;
        cal.y--;
    }
    if (cal.m > 11) {
        cal.m = 0;
        cal.y++;
    }
    go('calendar');
}
function freeTime() {
    let c = 8 * 60, out = [];
    const f = m => t12(`${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`);
    evs(today).forEach(e => {
        const s = mins(e.start);
        if (s - c >= 30)
            out.push([c, s]);
        c = Math.max(c, mins(e.end));
    });
    if (18 * 60 - c >= 30)
        out.push([c, 18 * 60]);
    const h = out.length ? out.map(g => `<div class="ev"><i style="background:var(--pri)"></i><div><b>${f(g[0])} - ${f(g[1])}</b><span>${Math.round((g[1] - g[0]) / 6) / 10} hr free</span></div></div>`).join('') : '<div class="empty">No free slots today</div>';
    const d = document.createElement('div');
    d.className = 'sheet';
    d.onclick = e => {
        if (e.target === d)
            d.remove();
    };
    d.innerHTML = `<div><div class="row"><h2>Free time today</h2><button class="x" onclick="this.closest('.sheet').remove()">×</button></div><p style="color:var(--mut);font-size:13px;margin-top:4px">Gaps of 30+ min between 8 AM and 6 PM</p>${h}</div>`;
    $('#app').appendChild(d);
}
function fit() {
    const a = $('#app');
    a.style.transform = innerWidth >= 600 ? `scale(${Math.min(1, (innerHeight - 24) / 844)})` : '';
}
addEventListener('resize', fit);
fit();
applyTheme();
go('splash');
