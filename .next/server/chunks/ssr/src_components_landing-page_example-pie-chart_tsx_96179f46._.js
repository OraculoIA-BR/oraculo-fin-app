module.exports = {

"[project]/src/components/landing-page/example-pie-chart.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/components/landing-page/example-pie-chart.tsx
__turbopack_context__.s({
    "ExamplePieChart": (()=>ExamplePieChart)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
const ExamplePieChart = ()=>{
    // Dados com proporções realistas
    const categories = [
        {
            name: "Moradia",
            value: 30,
            color: "bg-blue-800"
        },
        {
            name: "Alimentação",
            value: 16,
            color: "bg-blue-600"
        },
        {
            name: "Transporte",
            value: 8,
            color: "bg-blue-400"
        },
        {
            name: "Contas",
            value: 7,
            color: "bg-blue-300"
        },
        {
            name: "Dívidas",
            value: 5,
            color: "bg-blue-200"
        },
        {
            name: "Investimentos",
            value: 5,
            color: "bg-pink-500"
        },
        {
            name: "Saúde",
            value: 5,
            color: "bg-pink-400"
        },
        {
            name: "Compras",
            value: 4,
            color: "bg-pink-300"
        },
        {
            name: "Lazer",
            value: 4,
            color: "bg-pink-200"
        },
        {
            name: "Educação",
            value: 3,
            color: "bg-sky-400"
        }
    ];
    // Cria o gradiente cônico para a pizza
    const conicGradient = `conic-gradient(${categories.map((cat, index)=>{
        const startAngle = categories.slice(0, index).reduce((acc, c)=>acc + c.value * 3.6, 0);
        const endAngle = startAngle + cat.value * 3.6;
        const colorMap = {
            'blue-800': '#2B3FAE',
            'blue-600': '#4F46E5',
            'blue-400': '#60A5FA',
            'blue-300': '#93C5FD',
            'blue-200': '#BFDBFE',
            'pink-500': '#EC4899',
            'pink-400': '#F472B6',
            'pink-300': '#F9A8D4',
            'pink-200': '#FBCFE8',
            'sky-400': '#38BDF8'
        };
        return `${colorMap[cat.color.replace('bg-', '')]} ${startAngle}deg ${endAngle}deg`;
    }).join(', ')})`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-4 rounded-lg shadow-lg text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-md font-bold text-blue-900 mb-4",
                children: "Gastos Mensais (Exemplo)"
            }, void 0, false, {
                fileName: "[project]/src/components/landing-page/example-pie-chart.tsx",
                lineNumber: 36,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-40 h-40 mx-auto rounded-full",
                style: {
                    background: conicGradient
                }
            }, void 0, false, {
                fileName: "[project]/src/components/landing-page/example-pie-chart.tsx",
                lineNumber: 37,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid grid-cols-2 text-left text-xs gap-x-4 gap-y-1",
                children: categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `w-3 h-3 rounded-full ${cat.color}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/landing-page/example-pie-chart.tsx",
                                lineNumber: 44,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-600",
                                children: [
                                    cat.name,
                                    " (",
                                    cat.value,
                                    "%)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/landing-page/example-pie-chart.tsx",
                                lineNumber: 45,
                                columnNumber: 25
                            }, this)
                        ]
                    }, cat.name, true, {
                        fileName: "[project]/src/components/landing-page/example-pie-chart.tsx",
                        lineNumber: 43,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/landing-page/example-pie-chart.tsx",
                lineNumber: 41,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/landing-page/example-pie-chart.tsx",
        lineNumber: 35,
        columnNumber: 9
    }, this);
};
}}),

};

//# sourceMappingURL=src_components_landing-page_example-pie-chart_tsx_96179f46._.js.map