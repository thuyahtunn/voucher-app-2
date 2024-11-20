import React from "react";
import reactUseCookie from "react-use-cookie";
import useSWR from "swr";
import { apiUrl } from "../api/constant";
import { useParams } from "react-router-dom";
import useRecordStore from "../store/useRecordStore";
import html2pdf from "html2pdf.js";

const VoucherDetailSection = () => {
  const [tokenCookie] = reactUseCookie("token");
  const { id } = useParams();
  const fetcher = (url) =>
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokenCookie}`,
      },
    }).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    `${apiUrl}/vouchers/${id}`,
    fetcher
  );
  const { records } = useRecordStore();
  const total = records.reduce((pv, cv) => pv + cv.cost, 0);
  const tax = total * 0.05;
  const net_total = total + tax;
  const handlePrintBtn = () => {
    window.print();
  };

  const handlePdf = () => {
    const element = document.getElementById("invoice-content");

    // Options for PDF generation
    const opt = {
      margin: 0.1,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "a5", orientation: "portrait" },
    };

    // Convert the element to PDF
    html2pdf().from(element).set(opt).save();
  };
  return (
    <section>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div
            id="invoice-content"
            className="flex flex-col gap-5 border-b border-stone-500  mb-5 print:pt-5"
          >
            <div className=" flex justify-between items-center print:pe-1">
              <div className="flex flex-col">
                <h1 className=" font-bold text-2xl uppercase">Invoice</h1>
                <h3 className=" font-semibold text-lg uppercase text-stone-700">
                  INV-234-234234
                </h3>
              </div>
              <div className=" flex flex-col text-base font-semibold">
                <h5 className="  font-bold">Invoice to</h5>
                <p className=" text-stone-500">kyaw kayw</p>
                <p className=" text-stone-500">Date: 20 sept 2024</p>
              </div>
            </div>
            <table className=" w-full text-sm ">
              <thead>
                <tr className=" font-bold border-b border-stone-700">
                  <th className=" py-2 text-start">No</th>
                  <th className=" py-2 text-start">Description</th>
                  <th className=" py-2 text-end">Price</th>
                  <th className=" py-2 text-end">Qty</th>
                  <th className=" py-2 text-end">Cost</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.records.map((record, index) => (
                  <tr
                    key={record.id}
                    className=" font-semibold text-stone-800 border-b border-stone-300"
                  >
                    <td className=" py-2 text-start">{index + 1}</td>
                    <td className=" py-2 text-start">
                      {record.product.product_name}
                    </td>
                    <td className=" py-2 text-end">{record.product.price}</td>
                    <td className=" py-2 text-end">{record.quantity}</td>
                    <td className=" py-2 text-end">{record.cost}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className=" font-bold text-stone-800 border-b border-stone-300">
                  <td colSpan={4} className=" py-2 text-end">
                    Total
                  </td>
                  <td className=" py-2 text-end">
                    {parseInt(data?.data.total).toFixed(0)}
                  </td>
                </tr>
                <tr className=" font-bold text-stone-800 border-b border-stone-300">
                  <td colSpan={4} className=" py-2 text-end">
                    Tax
                  </td>
                  <td className=" py-2 text-end">
                    {parseInt(data?.data.tax).toFixed(0)}
                  </td>
                </tr>
                <tr className=" font-bold text-stone-800 border-b border-stone-300">
                  <td colSpan={4} className=" py-2 text-end">
                    Net Total
                  </td>
                  <td className=" py-2 text-end">
                    {parseInt(data?.data.net_total).toFixed(0)}
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className=" flex justify-between items-center">
              <div>
                <h5 className=" font-bold text-stone-900 ">
                  Payment Transfer To
                </h5>
                <p className=" font-semibold text-stone-600">
                  Kpay,Wave : 09250152018
                </p>
                <p className=" font-semibold text-stone-600">
                  KBZ Bank : 2354352352353244
                </p>
                <p className=" font-semibold text-stone-600">
                  AYA Bank : 325235242342
                </p>
              </div>
              <div>
                <h3 className=" font-bold uppercase text-stone-900 text-xl">
                  MMS IT
                </h3>
                <p className=" font-semibold text-stone-600">
                  48, 1st Floor, Shan Kone St.
                </p>
                <p className=" font-semibold text-stone-600">
                  +959-250-152-018
                </p>
                <p className=" font-semibold text-stone-600">
                  enquiry@mms-it.com
                </p>
              </div>
            </div>
            <h6 className=" font-semibold text-stone-700 text-center ">
              Thanks For Buying Us
            </h6>
          </div>

          <div className=" flex justify-between items-center font-semibold text-sm print:hidden">
            <button
              onClick={handlePdf}
              className=" px-4 py-2 border-2 border-stone-700 bg-stone-50 text-stone-900 rounded "
            >
              Download PDF
            </button>
            <button
              onClick={handlePrintBtn}
              className=" px-4 py-2 border-2 border-stone-700 bg-stone-700 text-stone-50 rounded "
            >
              Print
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default VoucherDetailSection;
