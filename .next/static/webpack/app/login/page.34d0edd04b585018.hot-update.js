"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app\\login\\page",{

/***/ "./app/tools/fetcher.ts":
/*!******************************!*\
  !*** ./app/tools/fetcher.ts ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\nconst fetcher = async (url, payload, token)=>{\n    let isLoading = false;\n    let data = null;\n    let error = \"\";\n    try {\n        isLoading = true;\n        const response = await fetch(url, {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\",\n                \"Authorization\": \"Bearer \".concat(token)\n            },\n            body: JSON.stringify(payload)\n        });\n        const responseData = await response.json();\n        isLoading = false;\n        if (!responseData.success) {\n            error = responseData.error;\n        }\n        data = responseData;\n    } catch (e) {\n        throw new Error(e.message);\n    }\n    return {\n        error,\n        isLoading,\n        data\n    };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (fetcher);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcHAvdG9vbHMvZmV0Y2hlci50cy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEsTUFBTUEsVUFBVSxPQUFPQyxLQUFLQyxTQUFTQyxRQUFVO0lBQzNDLElBQUlDLFlBQVksS0FBSztJQUNyQixJQUFJQyxPQUFPLElBQUk7SUFDZixJQUFJQyxRQUFRO0lBRVosSUFBSTtRQUNBRixZQUFZLElBQUk7UUFFaEIsTUFBTUcsV0FBVyxNQUFNQyxNQUFNUCxLQUFLO1lBQzlCUSxRQUFRO1lBQ1JDLFNBQVM7Z0JBQ0wsZ0JBQWdCO2dCQUNoQixpQkFBaUIsVUFBZ0IsT0FBTlA7WUFDL0I7WUFDQVEsTUFBTUMsS0FBS0MsU0FBUyxDQUFDWDtRQUN6QjtRQUVBLE1BQU1ZLGVBQWUsTUFBTVAsU0FBU1EsSUFBSTtRQUV4Q1gsWUFBWSxLQUFLO1FBRWpCLElBQUksQ0FBQ1UsYUFBYUUsT0FBTyxFQUFFO1lBQ3ZCVixRQUFRUSxhQUFhUixLQUFLO1FBQzlCLENBQUM7UUFDREQsT0FBT1M7SUFDWCxFQUFFLE9BQU9HLEdBQUc7UUFDUixNQUFNLElBQUlDLE1BQU1ELEVBQUVFLE9BQU8sRUFBRTtJQUMvQjtJQUVBLE9BQU87UUFBRWI7UUFBT0Y7UUFBV0M7SUFBSztBQUNwQztBQUVBLCtEQUFlTCxPQUFPQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC90b29scy9mZXRjaGVyLnRzPzM2ODciXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZmV0Y2hlciA9IGFzeW5jICh1cmwsIHBheWxvYWQsIHRva2VuKSA9PiB7XHJcbiAgICBsZXQgaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICBsZXQgZGF0YSA9IG51bGw7XHJcbiAgICBsZXQgZXJyb3IgPSAnJztcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlzTG9hZGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW59YFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGlzTG9hZGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlRGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIGVycm9yID0gcmVzcG9uc2VEYXRhLmVycm9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhID0gcmVzcG9uc2VEYXRhO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IGVycm9yLCBpc0xvYWRpbmcsIGRhdGEgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZldGNoZXI7XHJcbiJdLCJuYW1lcyI6WyJmZXRjaGVyIiwidXJsIiwicGF5bG9hZCIsInRva2VuIiwiaXNMb2FkaW5nIiwiZGF0YSIsImVycm9yIiwicmVzcG9uc2UiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc3BvbnNlRGF0YSIsImpzb24iLCJzdWNjZXNzIiwiZSIsIkVycm9yIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./app/tools/fetcher.ts\n"));

/***/ })

});