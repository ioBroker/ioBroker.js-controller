const tools = require('../../tools');

function getWidgetGroup(views, view, widget) {
    const widgets = views[view].widgets;
    let members;
    if (tools.isObject(widgets)) {
        for (const w of Object.keys(widgets)) {
            members = views[view].widgets[w].data.members;
            if (members && members.indexOf(widget) !== -1) {
                return w;
            }
        }
    }
    return null;
}

function extractBinding(format) {
    const oid = format.match(/{(.+?)}/g);
    let result = null;
    if (oid) {
        if (oid.length > 50) {
            console.warn('Too many bindings in one widget: ' + oid.length + '[max = 50]');
        }
        for (let p = 0; p < oid.length && p < 50; p++) {
            const _oid = oid[p].substring(1, oid[p].length - 1);
            if (_oid[0] === '{') {
                continue;
            }
            // If first symbol '"' => it is JSON
            if (_oid && _oid[0] === '"') {
                continue;
            }
            const parts = _oid.split(';');
            result = result || [];
            let systemOid = parts[0].trim();
            let visOid = systemOid;

            let test1 = visOid.substring(visOid.length - 4);
            let test2 = visOid.substring(visOid.length - 3);

            if (visOid && test1 !== '.val' && test2 !== '.ts' && test2 !== '.lc' && test1 !== '.ack') {
                visOid = visOid + '.val';
            }

            const isSeconds = (test2 === '.ts' || test2 === '.lc');

            test1 = systemOid.substring(systemOid.length - 4);
            test2 = systemOid.substring(systemOid.length - 3);

            if (test1 === '.val' || test1 === '.ack') {
                systemOid = systemOid.substring(0, systemOid.length - 4);
            } else if (test2 === '.lc' || test2 === '.ts') {
                systemOid = systemOid.substring(0, systemOid.length - 3);
            }
            let operations = null;
            const isEval = visOid.match(/[\d\w_.]+:[-\d\w_.]+/) || (!visOid.length && parts.length > 0);//(visOid.indexOf(':') !== -1) && (visOid.indexOf('::') === -1);

            if (isEval) {
                const xx = visOid.split(':', 2);
                const yy = systemOid.split(':', 2);
                visOid = xx[1];
                systemOid = yy[1];
                operations = operations || [];
                operations.push({
                    op: 'eval',
                    arg: [{
                        name: xx[0],
                        visOid: visOid,
                        systemOid: systemOid
                    }]
                });
            }

            for (let u = 1; u < parts.length; u++) {
                // eval construction
                if (isEval) {
                    if (parts[u].trim().match(/^[\d\w_.]+:[-.\d\w_]+$/)) {//parts[u].indexOf(':') !== -1 && parts[u].indexOf('::') === -1) {
                        let _systemOid = parts[u].trim();
                        let _visOid = _systemOid;

                        test1 = _visOid.substring(_visOid.length - 4);
                        test2 = _visOid.substring(_visOid.length - 3);

                        if (test1 !== '.val' && test2 !== '.ts' && test2 !== '.lc' && test1 !== '.ack') {
                            _visOid = _visOid + '.val';
                        }

                        test1 = systemOid.substring(_systemOid.length - 4);
                        test2 = systemOid.substring(_systemOid.length - 3);

                        if (test1 === '.val' || test1 === '.ack') {
                            _systemOid = _systemOid.substring(0, _systemOid.length - 4);
                        } else if (test2 === '.lc' || test2 === '.ts') {
                            _systemOid = _systemOid.substring(0, _systemOid.length - 3);
                        }
                        const x1 = _visOid.split(':', 2);
                        const y1 = _systemOid.split(':', 2);

                        operations[0].arg.push({
                            name:      x1[0],
                            visOid:    x1[1],
                            systemOid: y1[1]
                        });
                    } else {
                        parts[u] = parts[u].replace(/::/g, ':');
                        if (operations[0].formula) {
                            const n = JSON.parse(JSON.stringify(operations[0]));
                            n.formula = parts[u];
                            operations.push(n);
                        } else {
                            operations[0].formula = parts[u];
                        }
                    }
                } else {
                    const parse = parts[u].match(/([\w\s/+*-]+)(\(.+\))?/);
                    let param;
                    if (parse && parse[1]) {
                        parse[1] = parse[1].trim();
                        // operators requires parameter
                        if (parse[1] === '*' ||
                            parse[1] === '+' ||
                            parse[1] === '-' ||
                            parse[1] === '/' ||
                            parse[1] === '%' ||
                            parse[1] === 'min' ||
                            parse[1] === 'max') {
                            if (parse[2] === undefined) {
                                console.log('Invalid format of format string: ' + format);
                                parse[2] = null;
                            } else {
                                parse[2] = (parse[2] || '').trim().replace(',', '.');
                                parse[2] = parse[2].substring(1, parse[2].length - 1);
                                parse[2] = parseFloat(parse[2].trim());

                                if (parse[2].toString() === 'NaN') {
                                    console.log('Invalid format of format string: ' + format);
                                    parse[2] = null;
                                } else {
                                    operations = operations || [];
                                    operations.push({op: parse[1], arg: parse[2]});
                                }
                            }
                        } else
                        // date formatting
                        if (parse[1] === 'date') {
                            operations = operations || [];
                            parse[2] = (parse[2] || '').trim();
                            parse[2] = parse[2].substring(1, parse[2].length - 1);
                            operations.push({op: parse[1], arg: parse[2]});
                        } else
                        // returns array[value]. e.g.: {id.ack;array(ack is false,ack is true)}
                        if (parse[1] === 'array') {
                            operations = operations || [];
                            param = (parse[2] || '').trim();
                            param = param.substring(1, param.length - 1);
                            param = param.split(',');
                            if (Array.isArray(param)) {
                                operations.push ({op: parse[1], arg: param}); //xxx
                            }
                        } else
                        // value formatting
                        if (parse[1] === 'value') {
                            operations = operations || [];
                            param = (parse[2] === undefined) ? '(2)' : (parse[2] || '');
                            param = param.trim();
                            param = param.substring(1, param.length - 1);
                            operations.push({op: parse[1], arg: param});
                        } else
                        // operators have optional parameter
                        if (parse[1] === 'pow' || parse[1] === 'round' || parse[1] === 'random') {
                            if (parse[2] === undefined) {
                                operations = operations || [];
                                operations.push({op: parse[1]});
                            } else {
                                parse[2] = (parse[2] || '').trim().replace(',', '.');
                                parse[2] = parse[2].substring(1, parse[2].length - 1);
                                parse[2] = parseFloat(parse[2].trim());

                                if (parse[2].toString() === 'NaN') {
                                    console.log('Invalid format of format string: ' + format);
                                    parse[2] = null;
                                } else {
                                    operations = operations || [];
                                    operations.push({op: parse[1], arg: parse[2]});
                                }
                            }
                        } else {
                            // operators without parameter
                            operations = operations || [];
                            operations.push({op: parse[1]});
                        }
                    } else {
                        console.log('Invalid format ' + format);
                    }
                }
            }

            result.push({
                visOid: visOid,
                systemOid: systemOid,
                token: oid[p],
                operations: operations ? operations : undefined,
                format: format,
                isSeconds: isSeconds
            });
        }
    }
    return result;
}

function getUsedObjectIDs(views, isByViews) {
    if (!views) {
        console.log('Check why views are not yet loaded!');
        return null;
    }

    const _views = isByViews ? {} : null;
    const IDs         = [];
    const visibility  = {};
    const bindings    = {};
    const lastChanges = {};
    const signals     = {};

    let view;
    let id;
    let sidd;
    if (tools.isObject(views)) {
        for (view of Object.keys(views)) {
            if (view === '___settings') {
                continue;
            }

            if (_views) {
                _views[view] = [];
            }

            if (!tools.isObject(views[view].widgets)) {
                continue;
            }
            for (id of Object.keys(views[view].widgets)) {
                // Check all attributes
                const data  = views[view].widgets[id].data;
                const style = views[view].widgets[id].style;

                // fix error in naming
                if (views[view].widgets[id].groupped) {
                    views[view].widgets[id].grouped = true;
                    delete views[view].widgets[id].groupped;
                }

                // rename hqWidgets => hqwidgets
                if (views[view].widgets[id].widgetSet === 'hqWidgets') {
                    views[view].widgets[id].widgetSet = 'hqwidgets';
                }

                // rename RGraph => rgraph
                if (views[view].widgets[id].widgetSet === 'RGraph') {
                    views[view].widgets[id].widgetSet = 'rgraph';
                }

                // rename timeAndWeather => timeandweather
                if (views[view].widgets[id].widgetSet === 'timeAndWeather') {
                    views[view].widgets[id].widgetSet = 'timeandweather';
                }

                // convert "Show on Value" to HTML
                if (views[view].widgets[id].tpl === 'tplShowValue') {
                    views[view].widgets[id].tpl = 'tplHtml';
                    views[view].widgets[id].data['visibility-oid'] = views[view].widgets[id].data.oid;
                    views[view].widgets[id].data['visibility-val'] = views[view].widgets[id].data.value;
                    delete views[view].widgets[id].data.oid;
                    delete views[view].widgets[id].data.value;
                }

                // convert "Hide on >0/True" to HTML
                if (views[view].widgets[id].tpl === 'tplHideTrue') {
                    views[view].widgets[id].tpl = 'tplHtml';
                    views[view].widgets[id].data['visibility-cond'] = '!=';
                    views[view].widgets[id].data['visibility-oid'] = views[view].widgets[id].data.oid;
                    views[view].widgets[id].data['visibility-val'] = true;
                    delete views[view].widgets[id].data.oid;
                }

                // convert "Hide on 0/False" to HTML
                if (views[view].widgets[id].tpl === 'tplHide') {
                    views[view].widgets[id].tpl = 'tplHtml';
                    views[view].widgets[id].data['visibility-cond'] = '!=';
                    views[view].widgets[id].data['visibility-oid'] = views[view].widgets[id].data.oid;
                    views[view].widgets[id].data['visibility-val'] = false;
                    delete views[view].widgets[id].data.oid;
                }

                // convert "Door/Window sensor" to HTML
                if (views[view].widgets[id].tpl === 'tplHmWindow') {
                    views[view].widgets[id].tpl = 'tplValueBool';
                    views[view].widgets[id].data.html_false = views[view].widgets[id].data.html_closed;
                    views[view].widgets[id].data.html_true = views[view].widgets[id].data.html_open;
                    delete views[view].widgets[id].data.html_closed;
                    delete views[view].widgets[id].data.html_open;
                }

                // convert "Door/Window sensor" to HTML
                if (views[view].widgets[id].tpl === 'tplHmWindowRotary') {
                    views[view].widgets[id].tpl = 'tplValueListHtml8';
                    views[view].widgets[id].data.count = 2;
                    views[view].widgets[id].data.value0 = views[view].widgets[id].data.html_closed;
                    views[view].widgets[id].data.value1 = views[view].widgets[id].data.html_open;
                    views[view].widgets[id].data.value2 = views[view].widgets[id].data.html_tilt;
                    delete views[view].widgets[id].data.html_closed;
                    delete views[view].widgets[id].data.html_open;
                    delete views[view].widgets[id].data.html_tilt;
                }

                // convert "tplBulbOnOff" to tplBulbOnOffCtrl
                if (views[view].widgets[id].tpl === 'tplBulbOnOff') {
                    views[view].widgets[id].tpl = 'tplBulbOnOffCtrl';
                    views[view].widgets[id].data.readOnly = true;
                }

                // convert "tplValueFloatBarVertical" to tplValueFloatBar
                if (views[view].widgets[id].tpl === 'tplValueFloatBarVertical') {
                    views[view].widgets[id].tpl = 'tplValueFloatBar';
                    views[view].widgets[id].data.orientation = 'vertical';
                }

                if (tools.isObject(data)) {
                    for (let attr of Object.keys(data)) {
                        /* TODO DO do not forget remove it after a while. Required for import from DashUI */
                        if (attr === 'state_id') {
                            data.state_oid = data[attr];
                            delete data[attr];
                            attr = 'state_oid';
                        } else if (attr === 'number_id') {
                            data.number_oid = data[attr];
                            delete data[attr];
                            attr = 'number_oid';
                        } else if (attr === 'toggle_id') {
                            data.toggle_oid = data[attr];
                            delete data[attr];
                            attr = 'toggle_oid';
                        } else if (attr === 'set_id') {
                            data.set_oid = data[attr];
                            delete data[attr];
                            attr = 'set_oid';
                        } else if (attr === 'temp_id') {
                            data.temp_oid = data[attr];
                            delete data[attr];
                            attr = 'temp_oid';
                        } else if (attr === 'drive_id') {
                            data.drive_oid = data[attr];
                            delete data[attr];
                            attr = 'drive_oid';
                        } else if (attr === 'content_id') {
                            data.content_oid = data[attr];
                            delete data[attr];
                            attr = 'content_oid';
                        } else if (attr === 'dialog_id') {
                            data.dialog_oid = data[attr];
                            delete data[attr];
                            attr = 'dialog_oid';
                        } else if (attr === 'max_value_id') {
                            data.max_value_oid = data[attr];
                            delete data[attr];
                            attr = 'max_value_oid';
                        } else if (attr === 'weoid') {
                            data.woeid = data[attr];
                            delete data[attr];
                            attr = 'woeid';
                        }

                        if (typeof data[attr] === 'string') {
                            let m;
                            const oids = extractBinding(data[attr]);
                            if (oids) {
                                for (let t = 0; t < oids.length; t++) {
                                    let ssid = oids[t].systemOid;
                                    if (ssid) {
                                        if (IDs.indexOf(ssid) === -1) {
                                            IDs.push(ssid);
                                        }
                                        if (_views && _views[view].indexOf(ssid) === -1) {
                                            _views[view].push(ssid);
                                        }
                                        if (!bindings[ssid]) {
                                            bindings[ssid] = [];
                                        }
                                        oids[t].type = 'data';
                                        oids[t].attr = attr;
                                        oids[t].view = view;
                                        oids[t].widget = id;

                                        bindings[ssid].push(oids[t]);
                                    }

                                    if (oids[t].operations && oids[t].operations[0].arg instanceof Array) {
                                        for (let ww = 0; ww < oids[t].operations[0].arg.length; ww++) {
                                            ssid = oids[t].operations[0].arg[ww].systemOid;
                                            if (!ssid) {
                                                continue;
                                            }
                                            if (IDs.indexOf(ssid) === -1) {
                                                IDs.push(ssid);
                                            }
                                            if (_views && _views[view].indexOf(ssid) === -1) {
                                                _views[view].push(ssid);
                                            }
                                            if (!bindings[ssid]) {
                                                bindings[ssid] = [];
                                            }
                                            bindings[ssid].push(oids[t]);
                                        }
                                    }
                                }
                            } else if (attr !== 'oidTrueValue' && attr !== 'oidFalseValue' && ((attr.match(/oid\d{0,2}$/) || attr.match(/^oid/) || attr.match(/^signals-oid-/) || attr === 'lc-oid') && data[attr])) {
                                if (data[attr] && data[attr] !== 'nothing_selected') {
                                    if (IDs.indexOf(data[attr]) === -1) {
                                        IDs.push(data[attr]);
                                    }
                                    if (_views && _views[view].indexOf(data[attr]) === -1) {
                                        _views[view].push(data[attr]);
                                    }
                                }

                                // Visibility binding
                                if (attr === 'visibility-oid' && data['visibility-oid']) {
                                    let vid = data['visibility-oid'];
                                    if (vid.match(/^groupAttr(\d+)$/)) {
                                        const vgroup = getWidgetGroup(views, view, id);
                                        if (vgroup) {
                                            vid = views[view].widgets[vgroup].data[vid];
                                        }
                                    }

                                    if (!visibility[vid]) {
                                        visibility[vid] = [];
                                    }
                                    visibility[vid].push({view: view, widget: id});
                                }

                                // Signal binding
                                if (attr.match(/^signals-oid-/) && data[attr]) {
                                    let sid = data[attr];
                                    if (sid.match(/^groupAttr(\d+)$/)) {
                                        const group = getWidgetGroup(views, view, id);
                                        if (group) {
                                            sid = views[view].widgets[group].data[sid];
                                        }
                                    }

                                    if (!signals[sid]) {
                                        signals[sid] = [];
                                    }
                                    signals[sid].push({
                                        view: view,
                                        widget: id,
                                        index: parseInt(attr.substring('signals-oid-'.length), 10)
                                    });
                                }
                                if (attr === 'lc-oid') {
                                    let lcsid = data[attr];
                                    if (lcsid.match(/^groupAttr(\d+)$/)) {
                                        const ggroup = getWidgetGroup(views, view, id);
                                        if (ggroup) {
                                            lcsid = views[view].widgets[ggroup].data[lcsid];
                                        }
                                    }

                                    if (!lastChanges[lcsid]) {
                                        lastChanges[lcsid] = [];
                                    }
                                    lastChanges[lcsid].push({
                                        view: view,
                                        widget: id
                                    });
                                }
                            } else if ((m = attr.match(/^attrType(\d+)$/)) && data[attr] === 'id') {
                                const _id = 'groupAttr' + m[1];
                                if (data[_id]) {
                                    if (IDs.indexOf(data[_id]) === -1) {
                                        IDs.push(data[_id]);
                                    }
                                    if (_views && _views[view].indexOf(data[_id]) === -1) {
                                        _views[view].push(data[_id]);
                                    }
                                }
                            }
                        }
                    }
                }

                // build bindings for styles
                if (tools.isObject(style)) {
                    for (const cssAttr of Object.keys(style)) {
                        if (!cssAttr) {
                            continue;
                        }
                        if (typeof style[cssAttr] === 'string') {
                            const objIDs = extractBinding(style[cssAttr]);
                            if (objIDs) {
                                for (let tt = 0; tt < objIDs.length; tt++) {
                                    sidd = objIDs[tt].systemOid;
                                    if (sidd) {
                                        if (IDs.indexOf(sidd) === -1) {
                                            IDs.push(sidd);
                                        }
                                        if (_views && _views[view].indexOf(sidd) === -1) {
                                            _views[view].push(sidd);
                                        }
                                        if (!bindings[sidd]) {
                                            bindings[sidd] = [];
                                        }

                                        objIDs[tt].type = 'style';
                                        objIDs[tt].attr = cssAttr;
                                        objIDs[tt].view = view;
                                        objIDs[tt].widget = id;

                                        bindings[sidd].push(objIDs[tt]);
                                    }

                                    if (objIDs[tt].operations && objIDs[tt].operations[0].arg instanceof Array) {
                                        for (let w = 0; w < objIDs[tt].operations[0].arg.length; w++) {
                                            sidd = objIDs[tt].operations[0].arg[w].systemOid;
                                            if (!sidd) {
                                                continue;
                                            }
                                            if (IDs.indexOf(sidd) === -1) {
                                                IDs.push(sidd);
                                            }
                                            if (_views && _views[view].indexOf(sidd) === -1) {
                                                _views[view].push(sidd);
                                            }
                                            if (!bindings[sidd]) {
                                                bindings[sidd] = [];
                                            }
                                            bindings[sidd].push(objIDs[tt]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if (_views) {
        let changed;
        do {
            changed = false;
            // Check containers
            if (tools.isObject(views)) {
                for (view of Object.keys(views)) {
                    if (view === '___settings') {
                        continue;
                    }

                    if (tools.isObject(views[view].widgets)) {
                        for (id of Object.keys(views[view].widgets)) {
                            // Add all OIDs from this view to parent
                            if (views[view].widgets[id].tpl === 'tplContainerView' && views[view].widgets[id].data.contains_view) {
                                const ids = _views[views[view].widgets[id].data.contains_view];
                                if (ids) {
                                    for (let a = 0; a < ids.length; a++) {
                                        if (ids[a] && _views[view].indexOf(ids[a]) === -1) {
                                            _views[view].push(ids[a]);
                                            changed = true;
                                        }
                                    }
                                } else {
                                    console.warn('View does not exist: "' + views[view].widgets[id].data.contains_view + '"');
                                }
                            }
                        }
                    }
                }
            }
        } while (changed);
    }

    return {IDs: IDs, byViews: _views, visibility: visibility, bindings: bindings, lastChanges: lastChanges, signals: signals};
}

if (module && module.parent) {
    module.exports.getUsedObjectIDs = getUsedObjectIDs;
}
