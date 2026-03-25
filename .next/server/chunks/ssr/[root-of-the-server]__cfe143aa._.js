module.exports = [
"[project]/src/lib/checkout/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"401af0eca938df68e3feecf568926a9316180b0ccb":"validatePromoCode","4037c9767b93e41985d2a15189ca05019afd6212fe":"placeOrder","409e357c0055a541c02784e2cd6598fa9bb7e6b3da":"validateCard","40c4ab77e60671492d141e2b4d41c0c71ee4dedd07":"validateAddress","40dce7914d6890d2b0ba39648c2baaaa39d4342f15":"createPaymentIntent","60b656052bd24342bc2373148f7850a24c69ae49b3":"calculateTax","60e48921f4a9d4b272c4e15a8d467e5a267aa1f056":"validateAltPayment","7055fc6b0dec77889e1e000d26df92135d7e8c3938":"calculateShipping"},"",""] */ __turbopack_context__.s([
    "calculateShipping",
    ()=>calculateShipping,
    "calculateTax",
    ()=>calculateTax,
    "createPaymentIntent",
    ()=>createPaymentIntent,
    "placeOrder",
    ()=>placeOrder,
    "validateAddress",
    ()=>validateAddress,
    "validateAltPayment",
    ()=>validateAltPayment,
    "validateCard",
    ()=>validateCard,
    "validatePromoCode",
    ()=>validatePromoCode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
// ─── Mock helpers ───────────────────────────────────────────
function delay(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
function generateOrderId() {
    return `SS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}
async function validateAddress(address) {
    await delay(600);
    // Mock: always valid unless ZIP is obviously wrong
    if (address.zip.length < 5) {
        return {
            valid: false
        };
    }
    return {
        valid: true
    };
}
async function calculateShipping(_address, method, subtotal) {
    await delay(400);
    const rates = {
        standard: subtotal >= 35 ? 0 : 5.99,
        expedited: 7.99,
        overnight: 14.99
    };
    return {
        price: rates[method]
    };
}
async function calculateTax(_address, subtotal) {
    await delay(300);
    // Mock: 8.5% tax rate
    const rate = 0.085;
    const tax = Math.round(subtotal * rate * 100) / 100;
    return {
        tax,
        rate
    };
}
async function validatePromoCode(code) {
    await delay(500);
    const promoCodes = {
        SPICE10: {
            code: "SPICE10",
            discount: 10,
            type: "percentage"
        },
        WELCOME5: {
            code: "WELCOME5",
            discount: 5,
            type: "fixed"
        },
        FREESHIP: {
            code: "FREESHIP",
            discount: 0,
            type: "fixed"
        }
    };
    const promo = promoCodes[code.toUpperCase()];
    if (promo) {
        return {
            valid: true,
            promo
        };
    }
    return {
        valid: false,
        error: "Invalid promo code"
    };
}
async function createPaymentIntent(amount) {
    await delay(800);
    // Mock client secret — in production this calls Stripe API:
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: Math.round(amount * 100),
    //   currency: 'usd',
    // });
    // return { clientSecret: paymentIntent.client_secret };
    const mockSecret = `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substring(2)}`;
    return {
        clientSecret: mockSecret
    };
}
async function validateCard(cardNumber) {
    await delay(600);
    // Mock: reject cards starting with "0" or shorter than 16 digits
    const digits = cardNumber.replace(/\s/g, "");
    if (digits.length < 16 || digits.startsWith("0")) {
        return {
            valid: false,
            error: "Card validation failed. Please try another payment method."
        };
    }
    return {
        valid: true
    };
}
async function validateAltPayment(method, _amount) {
    await delay(700);
    // Mock: always succeed for demo purposes
    // In production this would verify with Apple Pay / Google Pay / PayPal APIs
    return {
        valid: true
    };
}
async function placeOrder(data) {
    await delay(1200);
    // Mock: always succeed
    // In production:
    // 1. Lock inventory
    // 2. Confirm Stripe PaymentIntent
    // 3. Create order in DB
    // 4. Send confirmation email
    // 5. Notify fulfillment
    const order = {
        id: generateOrderId(),
        contact: data.contact,
        shipping: data.shipping,
        deliveryMethod: data.deliveryMethod,
        gift: data.gift,
        totals: data.totals,
        createdAt: new Date().toISOString()
    };
    return {
        success: true,
        order
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    validateAddress,
    calculateShipping,
    calculateTax,
    validatePromoCode,
    createPaymentIntent,
    validateCard,
    validateAltPayment,
    placeOrder
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(validateAddress, "40c4ab77e60671492d141e2b4d41c0c71ee4dedd07", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(calculateShipping, "7055fc6b0dec77889e1e000d26df92135d7e8c3938", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(calculateTax, "60b656052bd24342bc2373148f7850a24c69ae49b3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(validatePromoCode, "401af0eca938df68e3feecf568926a9316180b0ccb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPaymentIntent, "40dce7914d6890d2b0ba39648c2baaaa39d4342f15", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(validateCard, "409e357c0055a541c02784e2cd6598fa9bb7e6b3da", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(validateAltPayment, "60e48921f4a9d4b272c4e15a8d467e5a267aa1f056", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(placeOrder, "4037c9767b93e41985d2a15189ca05019afd6212fe", null);
}),
"[project]/.next-internal/server/app/checkout/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/checkout/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$checkout$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/checkout/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
}),
"[project]/.next-internal/server/app/checkout/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/checkout/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "401af0eca938df68e3feecf568926a9316180b0ccb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$checkout$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validatePromoCode"],
    "4037c9767b93e41985d2a15189ca05019afd6212fe",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$checkout$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["placeOrder"],
    "409e357c0055a541c02784e2cd6598fa9bb7e6b3da",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$checkout$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateCard"],
    "60e48921f4a9d4b272c4e15a8d467e5a267aa1f056",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$checkout$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAltPayment"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$checkout$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$checkout$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/checkout/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/checkout/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$checkout$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/checkout/actions.ts [app-rsc] (ecmascript)");
}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/checkout/page.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/checkout/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/checkout/page.tsx <module evaluation>", "default");
}),
"[project]/src/app/checkout/page.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/checkout/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/checkout/page.tsx", "default");
}),
"[project]/src/app/checkout/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/checkout/page.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/checkout/page.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/checkout/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/checkout/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cfe143aa._.js.map