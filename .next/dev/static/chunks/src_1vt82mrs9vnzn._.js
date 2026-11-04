(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Battle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Battle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$combat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/combat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/input.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Battle({ config, onLeave }) {
    _s();
    const host = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null), surface = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null), controls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null), paused = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [isPaused, setPaused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), [round, setRound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), [hud, setHud] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        hero: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$combat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["B"].heroHP,
        boss: config.hp,
        tick: 0,
        status: "playing",
        phase: "idle",
        dash: 0
    }), [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(""), [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const toggle = ()=>{
        paused.current = !paused.current;
        setPaused(paused.current);
        controls.current?.clear();
        surface.current?.focus();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Battle.useEffect": ()=>{
            let cancelled = false;
            let game;
            let resize;
            const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$combat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBattle"])(config);
            const el = surface.current;
            const input = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controls"](el, {
                "Battle.useEffect": ()=>{
                    paused.current = !paused.current;
                    setPaused(paused.current);
                    input.clear();
                }
            }["Battle.useEffect"]);
            controls.current = input;
            const blur = {
                "Battle.useEffect.blur": ()=>{
                    paused.current = true;
                    setPaused(true);
                    input.clear();
                }
            }["Battle.useEffect.blur"];
            const visibility = {
                "Battle.useEffect.visibility": ()=>{
                    if (document.hidden) blur();
                }
            }["Battle.useEffect.visibility"];
            window.addEventListener("blur", blur);
            document.addEventListener("visibilitychange", visibility);
            Promise.all([
                __turbopack_context__.A("[project]/node_modules/phaser/dist/phaser.js [app-client] (ecmascript, async loader)"),
                __turbopack_context__.A("[project]/src/game/scene.ts [app-client] (ecmascript, async loader)")
            ]).then({
                "Battle.useEffect": ([{ default: Phaser }, { Arena }])=>{
                    if (cancelled) return;
                    const notify = {
                        "Battle.useEffect.notify": (s)=>setHud({
                                "Battle.useEffect.notify": (prev)=>{
                                    const next = {
                                        hero: s.hero.hp,
                                        boss: s.boss.hp,
                                        tick: s.tick,
                                        status: s.status,
                                        phase: s.boss.phase,
                                        dash: s.hero.dashCD
                                    };
                                    return Object.keys(next).every({
                                        "Battle.useEffect.notify": (k)=>prev[k] === next[k]
                                    }["Battle.useEffect.notify"]) ? prev : next;
                                }
                            }["Battle.useEffect.notify"])
                    }["Battle.useEffect.notify"];
                    game = new Phaser.Game({
                        type: Phaser.AUTO,
                        parent: host.current,
                        width: 480,
                        height: 270,
                        backgroundColor: "#111217",
                        pixelArt: true,
                        roundPixels: true,
                        scale: {
                            mode: Phaser.Scale.FIT,
                            autoCenter: Phaser.Scale.CENTER_BOTH
                        },
                        scene: new Arena(state, input, {
                            "Battle.useEffect": ()=>paused.current
                        }["Battle.useEffect"], notify),
                        audio: {
                            noAudio: true
                        }
                    });
                    resize = new ResizeObserver({
                        "Battle.useEffect": ()=>game?.scale.refresh()
                    }["Battle.useEffect"]);
                    resize.observe(host.current);
                    game.canvas.setAttribute("aria-label", "Side-view arena. Use the controls below to fight the Warden.");
                    setReady(true);
                    el.focus();
                }
            }["Battle.useEffect"]).catch({
                "Battle.useEffect": ()=>{
                    if (!cancelled) setError("The arena could not load. Please reload the page.");
                }
            }["Battle.useEffect"]);
            return ({
                "Battle.useEffect": ()=>{
                    cancelled = true;
                    input.destroy();
                    controls.current = null;
                    window.removeEventListener("blur", blur);
                    document.removeEventListener("visibilitychange", visibility);
                    resize?.disconnect();
                    game?.destroy(true);
                }
            })["Battle.useEffect"];
        }
    }["Battle.useEffect"], [
        config,
        round
    ]);
    const restart = ()=>{
        paused.current = false;
        setPaused(false);
        setReady(false);
        setRound((x)=>x + 1);
    };
    const touch = (action, label)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "touch " + action,
            "aria-label": label,
            onPointerDown: (e)=>{
                e.preventDefault();
                e.currentTarget.setPointerCapture(e.pointerId);
                surface.current?.focus();
                controls.current?.press("touch" + e.pointerId, action);
            },
            onPointerUp: (e)=>controls.current?.release("touch" + e.pointerId),
            onPointerCancel: (e)=>controls.current?.release("touch" + e.pointerId),
            onLostPointerCapture: (e)=>controls.current?.release("touch" + e.pointerId),
            children: label
        }, void 0, false, {
            fileName: "[project]/src/components/Battle.tsx",
            lineNumber: 126,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "battle",
        ref: surface,
        tabIndex: 0,
        "aria-label": "Battle controls",
        onBlur: (e)=>{
            if (!e.currentTarget.contains(e.relatedTarget)) {
                controls.current?.clear();
                paused.current = true;
                setPaused(true);
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "battle-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "eyebrow",
                                children: "TRIAL 001 · THE FORSAKEN KEEP"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Battle.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: config.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/Battle.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onLeave,
                        className: "quiet",
                        children: "Leave arena ↗"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Battle.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hud",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "THE CHALLENGER",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: [
                                            hud.hero,
                                            " / ",
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$combat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["B"].heroHP
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Battle.tsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Battle.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meter", {
                                min: "0",
                                max: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$combat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["B"].heroHP,
                                value: hud.hero,
                                "aria-label": "Hero health"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Battle.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                        children: [
                            Math.floor(hud.tick / 3600).toString().padStart(2, "0"),
                            ":",
                            Math.floor(hud.tick / 60 % 60).toString().padStart(2, "0")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "THE WARDEN",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: [
                                            hud.boss,
                                            " / ",
                                            config.hp
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Battle.tsx",
                                        lineNumber: 194,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Battle.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meter", {
                                min: "0",
                                max: config.hp,
                                value: hud.boss,
                                "aria-label": "Boss health"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Battle.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Battle.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "arena-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: host,
                        className: "canvas-host"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this),
                    !ready && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overlay",
                        children: "Opening the gates…"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 208,
                        columnNumber: 30
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overlay",
                        role: "alert",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this),
                    (isPaused || hud.status !== "playing") && ready && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overlay",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "eyebrow",
                                children: hud.status === "victory" ? "THE TRIAL IS COMPLETE" : "THE KEEP AWAITS"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Battle.tsx",
                                lineNumber: 216,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: hud.status === "victory" ? "Warden vanquished" : hud.status === "defeat" ? "You have fallen" : "Battle paused"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Battle.tsx",
                                lineNumber: 221,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: hud.status === "victory" ? "You defeated your creation." : hud.status === "defeat" ? "Read the wind-up. Dash through the blade." : "Take a breath. Your trial will wait."
                            }, void 0, false, {
                                fileName: "[project]/src/components/Battle.tsx",
                                lineNumber: 228,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "primary",
                                onClick: hud.status === "playing" ? toggle : restart,
                                children: hud.status === "playing" ? "Resume battle" : "Try again ↗"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Battle.tsx",
                                lineNumber: 235,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 215,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Battle.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "battle-tools",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-live": "polite",
                        children: hud.status === "playing" ? hud.phase === "telegraph" ? "⚠ Heavy slash incoming" : hud.phase === "recovery" || hud.phase === "damage" ? "Opening! Strike now." : "Watch the Warden’s blade." : hud.status === "victory" ? "Victory — challenge verified locally." : "Defeat — another attempt awaits."
                    }, void 0, false, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggle,
                                disabled: hud.status !== "playing",
                                children: isPaused ? "Resume" : "Pause"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Battle.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: restart,
                                children: "Restart"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Battle.tsx",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Battle.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "touch-controls",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            touch("left", "←"),
                            touch("right", "→")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            touch("jump", "Jump"),
                            touch("dash", hud.dash ? "Dash · wait" : "Dash"),
                            touch("attack", "Strike")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 268,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Battle.tsx",
                lineNumber: 263,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "control-help",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                        children: "A"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                        children: "D"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this),
                    " move ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                        children: "Space"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 276,
                        columnNumber: 27
                    }, this),
                    " jump ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                        children: "J"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 276,
                        columnNumber: 49
                    }, this),
                    " strike",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                        children: "Shift"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this),
                    " dash ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                        children: "Esc"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 277,
                        columnNumber: 31
                    }, this),
                    " pause",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "· Landscape recommended on mobile"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Battle.tsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Battle.tsx",
                lineNumber: 274,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Battle.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
}
_s(Battle, "XZ4vuSl5JQiPKg7uHSyYL8LrqV8=");
_c = Battle;
var _c;
__turbopack_context__.k.register(_c, "Battle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Battle.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/Battle.tsx [app-client] (ecmascript)"));
}),
"[project]/src/game/input.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Controls",
    ()=>Controls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$combat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/combat.ts [app-client] (ecmascript)");
;
const keys = {
    KeyA: "left",
    ArrowLeft: "left",
    KeyD: "right",
    ArrowRight: "right",
    Space: "jump",
    KeyW: "jump",
    ArrowUp: "jump",
    KeyJ: "attack",
    KeyX: "attack",
    ShiftLeft: "dash",
    ShiftRight: "dash",
    KeyK: "dash"
};
class Controls {
    target;
    pause;
    held;
    taps;
    constructor(target, pause){
        this.target = target;
        this.pause = pause;
        this.held = new Map();
        this.taps = new Set();
        this.down = (e)=>{
            if (e.code === "Escape" || e.code === "KeyP") {
                e.preventDefault();
                if (!e.repeat) this.pause();
                return;
            }
            const a = keys[e.code];
            if (a) {
                e.preventDefault();
                if (!e.repeat) this.press(e.code, a);
            }
        };
        this.up = (e)=>{
            if (keys[e.code]) {
                e.preventDefault();
                this.release(e.code);
            }
        };
        target.addEventListener("keydown", this.down);
        target.addEventListener("keyup", this.up);
    }
    down;
    up;
    press(id, a) {
        this.held.set(id, a);
        this.taps.add(a);
    }
    release(id) {
        this.held.delete(id);
    }
    sample() {
        const i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$combat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noInput"])();
        for (const a of this.held.values())if (a === "left" || a === "right") i[a] = true;
        for (const a of this.taps)i[a] = true;
        this.taps.clear();
        return i;
    }
    clear() {
        this.held.clear();
        this.taps.clear();
    }
    destroy() {
        this.clear();
        this.target.removeEventListener("keydown", this.down);
        this.target.removeEventListener("keyup", this.up);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1vt82mrs9vnzn._.js.map