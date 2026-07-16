import Image from 'next/image'
import React from 'react'
import { FaDownload } from 'react-icons/fa'

// ============================================= TYPE DEFINITIONS =======================================================
export type OrderStatus = "pending" | "processing" | "completed" | "cancelled" | "payment_status";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type FoodStatus = "available" | "unavailable" | "out_of_stock";
export type PlanType = "regular" | "weekly" | "monthly";

export interface FoodDetails {
    id: number;
    category_id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    image: string;
    status: FoodStatus;
    created_at: string;
    updated_at: string;
}

export interface OrderItem {
    id: number;
    order_id: number;
    food_id: number;
    plan_type: PlanType;
    total_days: number;
    quantity: number;
    unit_price: string;
    subtotal: string;
    created_at: string;
    updated_at: string;
    food: FoodDetails;
}

export interface Order {
    full_name: string; 
    email: string; 
    phone: string; 
    address: string;
    id: number;
    user_id: number;
    order_number: string;
    total_amount: string;
    status: OrderStatus;
    payment_status: PaymentStatus;
    created_at: string;
    updated_at: string;
    total_deliveries: number;
    completed_deliveries: number;
    items: OrderItem[];
}

// Props definition for the OrderDetails Component
interface OrderDetailsProps {
    selectedOrder: Order | null;
    handleDownloadPDF: () => void;
    setSelectedOrder: (order: Order | null) => void;
}

// Helper styling function internal to the modal tracking
const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
        case "completed":
            return "bg-green-100 text-green-700";
        case "pending":
            return "bg-yellow-100 text-yellow-700";
        case "processing":
            return "bg-blue-100 text-blue-700";
        case "cancelled":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-600";
    }
};

// ============================================= COMPONENT IMPLEMENTATION =======================================================
const OrderDetails: React.FC<OrderDetailsProps> = ({
    selectedOrder,
    handleDownloadPDF,
    setSelectedOrder
}) => {
    // Structural guard clause if no order data is selected/present
    if (!selectedOrder) return null;

    return (
        <div>
            <div className="fixed  inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm print:absolute print:inset-0 print:bg-white print:p-0 print:backdrop-blur-none">
                <div className="bg-white w-full h-[90vh] overflow-y-scroll max-w-2xl rounded-2xl shadow-xl overflow-hidden border border-gray-100 print:border-none print:shadow-none">

                    {/* MODAL ACTION BAR - HIDDEN DURING DOWNLOAD/PRINT */}
                    <div className="flex justify-between items-center bg-gray-50 px-6 py-4 border-b border-gray-100 print:hidden">
                        <h2 className="text-lg font-bold text-gray-800">Receipt Details</h2>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleDownloadPDF}
                                className="flex items-center gap-2 bg-[#0b7211] hover:bg-[#095c0e] text-white px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer shadow-sm"
                            >
                                <FaDownload size={14} /> Download PDF
                            </button>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-400 hover:text-gray-600 font-semibold p-2 hover:bg-gray-200/50 rounded-full cursor-pointer transition text-base"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* RENDERED INVOICE VIEWPORT */}
                    <div className="p-6 md:p-8 space-y-6">
                        {/* Invoice Header Branding */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-gray-100 pb-6">
                            <div>
                                <h3 className="text-2xl font-black text-[#0b7211] tracking-tight">Lovelys Meal Plans</h3>
                                <p className="text-sm text-gray-400 mt-1">Order Transaction Invoice</p>
                            </div>
                            <div className="sm:text-right">
                                <div className="text-xs uppercase font-bold tracking-wider text-gray-400">Order ID</div>
                                <div className="text-lg font-mono font-bold text-gray-800">{selectedOrder.order_number}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                    Date: {new Date(selectedOrder.created_at).toLocaleString()}
                                </div>
                            </div>
                        </div>

                        {/* Status Section Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <div>
                                <span className="block text-xs font-semibold text-gray-400 uppercase">Order Status</span>
                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mt-1 uppercase tracking-wide ${getStatusStyle(selectedOrder.status)}`}>
                                    {selectedOrder.status}
                                </span>
                            </div>
                            
                            <div>
                                <span className="block text-xs font-semibold text-gray-400 uppercase">Payment</span>
                                <span className="text-sm font-bold text-gray-700 block mt-1 uppercase tracking-wide">
                                    {selectedOrder.payment_status}
                                </span>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold text-gray-400 uppercase">Deliveries</span>
                                <span className="text-sm font-bold text-gray-700 block mt-1">
                                    {selectedOrder.completed_deliveries} / {selectedOrder.total_deliveries}
                                </span>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold text-gray-400 uppercase">User Account</span>
                                <span className="text-sm font-mono font-bold text-gray-700 block mt-1">
                                    ID: #{selectedOrder.user_id}
                                </span>
                            </div>
                        </div>

                        {/* Order Items Table Breakdown */}
                        <div>
                            <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Purchased Items</h4>
                            <div className="border border-gray-100 rounded-xl overflow-hidden">
                                <table className="min-w-full text-sm">
                                    <thead className="bg-gray-50 font-semibold text-gray-500 border-b border-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 text-left">Item Details</th>
                                            <th className="px-4 py-3 text-center">Type</th>
                                            <th className="px-4 py-3 text-center">Qty x Price</th>
                                            <th className="px-4 py-3 text-right">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-gray-600">
                                        {selectedOrder.items?.map((item) => (
                                            <tr key={item.id} className="align-middle">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        {item.food?.image && (
                                                            <Image
                                                                src={item.food.image}
                                                                alt={item.food.name}
                                                                unoptimized
                                                                width={100}
                                                                height={100}
                                                                className="w-10 h-10 object-cover rounded-lg border border-gray-100 print:hidden"
                                                            />
                                                        )}
                                                        <div>
                                                            <p className="font-semibold text-gray-800">{item.food?.name || "Item Missing"}</p>
                                                            <p
                                                                className="text-xs text-gray-400 italic max-w-45 truncate"
                                                                dangerouslySetInnerHTML={{ __html: item.food?.description || '' }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-center capitalize">
                                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md">
                                                        {item.plan_type} ({item.total_days}d)
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-center font-mono text-gray-500">
                                                    {item.quantity} × ${parseFloat(item.unit_price).toFixed(2)}
                                                </td>
                                                <td className="px-4 py-3 text-right font-semibold font-mono text-gray-800">
                                                    ${parseFloat(item.subtotal).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* delivery details  */}

                        <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-slate-900">
                                    Delivery Address
                                </h2>
                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                    Active
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Name
                                    </p>
                                    <p className="mt-1 text-base font-medium text-slate-900">
                                        {
                                            selectedOrder?.full_name
                                        }
                                    </p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                            Email
                                        </p>
                                        <p className="mt-1 text-sm text-slate-700">{selectedOrder?.email}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                            Phone
                                        </p>
                                        <p className="mt-1 text-sm text-slate-700">{selectedOrder?.phone}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Address
                                    </p>
                                    <p className="mt-1 text-sm leading-6 text-slate-700">
                                        {selectedOrder?.address}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>

                        </div>

                        {/* Total Calculation & Footer Notes */}
                        <div className="flex flex-col sm:flex-row justify-between items-stretch gap-4 pt-4 border-t border-gray-100">
                            <div className="text-xs text-gray-400 max-w-xs flex flex-col justify-end">
                                <p>Thank you for shopping with us! If you have queries regarding this transaction, contact support with your Invoice Order ID.</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 min-w-[240px] space-y-1.5 self-end">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Items Subtotal:</span>
                                    <span className="font-mono">${parseFloat(selectedOrder.total_amount).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Delivery Fee:</span>
                                    <span className="font-mono">$0.00</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold text-gray-800 border-t border-gray-200/60 pt-1.5 mt-1">
                                    <span>Grand Total:</span>
                                    <span className="font-mono text-lg text-[#0b7211]">${parseFloat(selectedOrder.total_amount).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OrderDetails