"use client";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateQuotationPDF = async (quotation) => {

  if (typeof window === 'undefined') {
    throw new Error('PDF generation is only available in browser environment');
  }

  const pdfContainer = document.createElement('div');
  pdfContainer.style.width = '210mm';
  pdfContainer.style.minHeight = '297mm';
  pdfContainer.style.padding = '10mm';
  pdfContainer.style.backgroundColor = 'white';
  pdfContainer.style.position = 'absolute';
  pdfContainer.style.left = '-9999px';
  pdfContainer.style.top = '0';
  pdfContainer.style.fontFamily = 'Arial, sans-serif';
  pdfContainer.style.fontSize = '10pt';
  pdfContainer.style.lineHeight = '1.3';

  // Format functions
  const formatIndianRupees = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calculateTotals = () => {
    // Calculate transport total based on type
    const transportTotal = quotation.transportation.type === 'household' 
      ? (quotation.transportation.householdGoods.charge || 0)
      : (quotation.transportation.vehicle.charge || 0);
    
    const servicesTotal = 
      (quotation.services.packing || 0) +
      (quotation.services.unpacking || 0) +
      (quotation.services.loading || 0) +
      (quotation.services.unloading || 0) +
      (quotation.services.stabilization || 0) +
      (quotation.services.additionalCharge || 0) +
      (quotation.services.electricalService?.charge || 0);
    
    const subtotal = transportTotal + servicesTotal;

    return {
      transportTotal,
      servicesTotal,
      subtotal,
      totalAmount: quotation.totalAmount
    };
  };

  const totals = calculateTotals();
  
  // Filter active services including electrical service
  const activeServices = Object.entries(quotation.services)
    .filter(([key, value]) => {
      if (key === 'electricalService') {
        return quotation.services.electricalService && 
          (quotation.services.electricalService.disconnect || quotation.services.electricalService.reconnect) &&
          quotation.services.electricalService.charge > 0;
      }
      if (key === 'additionalCharge') return value > 0;
      return value > 0;
    });

  // Function to load image and return base64 or null
  const loadImageAsBase64 = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error(`Failed to load image: ${url}`, error);
      return null;
    }
  };

  // Load images
  const [logoBase64, stampBase64, qrCodeBase64] = await Promise.all([
    loadImageAsBase64('https://relaxgroup.in/images/relax-logo-removebg.png'),
    loadImageAsBase64('./images/relax-brand-stamp.png'),
    loadImageAsBase64('./images/relax-qr-code.png')
  ]);

  // Build compact PDF HTML content
  pdfContainer.innerHTML = `
    <div style="min-height: 277mm; background: white;">
      <!-- Header with Logo, Business Info and Quotation Title -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 8px; margin-bottom: 15px;">
        <!-- Left side: Logo and Business Info -->
        <div style="flex: 1;">
          <div style="display: flex; align-items: flex-start; gap: 12px;">
            <!-- Actual Logo -->
            <div style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; border: ${logoBase64 ? 'none' : '1px solid #ddd'}; background: ${logoBase64 ? 'transparent' : '#f9f9f9'};">
              ${logoBase64 ?
      `<img src="${logoBase64}" alt="Relax Packers & Movers" style="width: 100%; height: 100%; object-fit: contain;" />` :
      `<div style="text-align: center;">
                  <div style="font-size: 8pt; color: #666;">LOGO</div>
                  <div style="font-size: 6pt; color: #999;">(Image not loaded)</div>
                </div>`
    }
            </div>
            
            <!-- Business Information -->
            <div style="flex: 1;">
              <h2 style="font-size: 15pt; font-weight: bold; margin: 0 0 5px 0; color: #000;">RELAX PACKERS & MOVERS</h2>
              <p style="font-size: 9pt; margin: 2px 0; color: #666;">
                Registered Office: Cuttack, Odisha - 753014
              </p>
              <p style="font-size: 9pt; margin: 2px 0; color: #666;">
                Phone: +91 97770 12315 | Email: bookrelaxpackers@gmail.com
              </p>
              <p style="font-size: 8pt; margin: 2px 0; color: #999;">
                GST IN: 21BUQPN8897R1Z8
              </p>
            </div>
          </div>
        </div>
        
        <!-- Right side: Quotation Title -->
        <div style="text-align: right;">
          <h2 style="font-size: 18pt; font-weight: bold; margin: 0; color: #000;">QUOTATION</h2>
          <p style="font-size: 10pt; margin: 3px 0; color: #333;">Ref: ${quotation.quotationNumber}</p>
          <p style="font-size: 10pt; margin: 3px 0; color: #333;">Date: ${formatDate(quotation.quotationDate)}</p>
        </div>
      </div>

      <!-- Customer Details -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
        <!-- Left side: Customer Information -->
        <div style="flex: 1;">
          <h3 style="font-size: 11pt; font-weight: bold; margin: 0 0 5px 0; display: inline-block;">To</h3>
          <div style="padding: 8px 0;">
            <p style="font-size: 10pt; margin: 4px 0; font-weight: bold;">
              ${quotation.customer.gender === 'Male' ? 'Mr.' : 'Ms.'} ${quotation.customer.name}
            </p>
            <p style="font-size: 9pt; margin: 3px 0; line-height: 1.3;">${quotation.customer.address}</p>
            <p style="font-size: 9pt; margin: 3px 0;">📞 ${quotation.customer.phone}</p>
            ${quotation.customer.email ? `<p style="font-size: 9pt; margin: 3px 0;">✉️ ${quotation.customer.email}</p>` : ''}
          </div>
        </div>
        
        <!-- Right side: From/To Locations -->
        <div style="flex: 1; text-align: right;">
          <div style="display: inline-block; text-align: left;">
            <div style="margin-bottom: 8px;">
              <p style="font-size: 10pt; margin: 0 0 2px 0; font-weight: bold; color: #333;">From:</p>
              <p style="font-size: 9pt; margin: 0; color: #666;">${quotation.fromLocation}</p>
            </div>
            <div>
              <p style="font-size: 10pt; margin: 0 0 2px 0; font-weight: bold; color: #333;">To:</p>
              <p style="font-size: 9pt; margin: 0; color: #666;">${quotation.toLocation}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Personalized Message -->
      <div style="margin-bottom: 18px; padding: 12px; background: #f9f9f9; border-left: 4px solid #000; border-radius: 0 4px 4px 0;">
        <p style="font-size: 10pt; margin: 0; line-height: 1.4;">
          Dear <strong>${quotation.customer.gender === 'Male' ? 'Mr.' : 'Ms.'} ${quotation.customer.name}</strong>,
        </p>
        <p style="font-size: 10pt; margin: 6px 0 0 0; line-height: 1.5;">
          We thank you for your valuable enquiry for transportation of your 
          ${quotation.transportation.type === 'household' ? 'Household Goods' : 'Vehicle'}. 
          We are pleased to quote the rates for the same as under:
        </p>
      </div>

      <!-- Pricing Table - Improved spacing -->
      <div style="margin-bottom: 15px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 9pt; border: 1px solid #ccc; margin-top: 5px;">
          <thead>
            <tr style="background: #f8f8f8;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold; width: 8%;">Sr.</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left; font-weight: bold; width: 62%;">Particulars</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold; width: 30%;">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <!-- Transportation - Dynamic based on type -->
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center; vertical-align: top;">1</td>
              <td style="border: 1px solid #ddd; padding: 8px; vertical-align: top;">
                <strong>${quotation.transportation.type === 'household' ? 'Household Goods Transportation' : 'Vehicle Transportation'}</strong>
                <div style="font-size: 8pt; color: #666; margin-top: 4px;">
                  ${quotation.transportation.type === 'household' ? 
                    (quotation.transportation.householdGoods.volume || quotation.transportation.householdGoods.approxDistance ? `
                      ${quotation.transportation.householdGoods.volume ? `<span>Volume: ${quotation.transportation.householdGoods.volume}</span>` : ''}
                      ${quotation.transportation.householdGoods.volume && quotation.transportation.householdGoods.approxDistance ? ' | ' : ''}
                      ${quotation.transportation.householdGoods.approxDistance ? `<span>Distance: ${quotation.transportation.householdGoods.approxDistance}</span>` : ''}
                    ` : '') :
                    (quotation.transportation.vehicle.vehicleType || quotation.transportation.vehicle.approxDistance ? `
                      ${quotation.transportation.vehicle.vehicleType ? `<span>Vehicle: ${quotation.transportation.vehicle.vehicleType}</span>` : ''}
                      ${quotation.transportation.vehicle.vehicleType && quotation.transportation.vehicle.approxDistance ? ' | ' : ''}
                      ${quotation.transportation.vehicle.approxDistance ? `<span>Distance: ${quotation.transportation.vehicle.approxDistance}</span>` : ''}
                    ` : '')
                  }
                </div>
              </td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right; vertical-align: top; font-weight: bold;">
                ${quotation.transportation.type === 'household' 
                  ? quotation.transportation.householdGoods.charge?.toLocaleString('en-IN')
                  : quotation.transportation.vehicle.charge?.toLocaleString('en-IN')
                }
              </td>
            </tr>

            <!-- Services - Including Electrical Services -->
            ${activeServices.length > 0 ? `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center; vertical-align: top;">2</td>
              <td style="border: 1px solid #ddd; padding: 8px; vertical-align: top;">
                <strong>Additional Services Cost</strong>
                <div style="font-size: 8pt; margin-top: 4px; color: #555;">
                  ${activeServices.map(([key, value]) => {
                    if (key === 'electricalService') {
                      const electricalService = quotation.services.electricalService;
                      return `
                        <div style="display: flex; justify-content: space-between; padding: 2px 0;">
                          <span>
                            ${electricalService.disconnect && electricalService.reconnect 
                              ? 'Electrical Disconnect & Reconnect'
                              : electricalService.disconnect 
                                ? 'Electrical Disconnect'
                                : 'Electrical Reconnect'
                            }
                          </span>
                          <span>₹${electricalService.charge.toLocaleString('en-IN')}</span>
                        </div>
                      `;
                    }
                    return `
                      <div style="display: flex; justify-content: space-between; padding: 2px 0;">
                        <span style="text-transform: capitalize;">
                          ${key === 'additionalCharge' ? 'Additional Charge' : key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span>₹${value.toLocaleString('en-IN')}</span>
                      </div>
                    `;
                  }).join('')}
                </div>
              </td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right; vertical-align: top; font-weight: bold;">
                ${totals.servicesTotal.toLocaleString('en-IN')}
              </td>
            </tr>
            ` : ''}

            <!-- Subtotal -->
            <tr style="background: #f0f0f0;">
              <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold; text-align: center;" colspan="2">Sub Total</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">
                ${totals.subtotal.toLocaleString('en-IN')}
              </td>
            </tr>

            <!-- Taxes -->
            ${quotation.taxes.fov.amount > 0 ? `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">
                ${activeServices.length > 0 ? '3' : '2'}
              </td>
              <td style="border: 1px solid #ddd; padding: 8px;">CGST @${quotation.taxes.fov.percentage}%</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${quotation.taxes.fov.amount.toLocaleString('en-IN')}</td>
            </tr>
            ` : ''}

            ${quotation.taxes.surcharge.amount > 0 ? `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">
                ${activeServices.length > 0 ? '4' : '3'}
              </td>
              <td style="border: 1px solid #ddd; padding: 8px;">SGST @${quotation.taxes.surcharge.percentage}%</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${quotation.taxes.surcharge.amount.toLocaleString('en-IN')}</td>
            </tr>
            ` : ''}

            ${quotation.taxes.gst.amount > 0 ? `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">
                ${activeServices.length > 0 ? '5' : '4'}
              </td>
              <td style="border: 1px solid #ddd; padding: 8px;">IGST @${quotation.taxes.gst.percentage}%</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${quotation.taxes.gst.amount.toLocaleString('en-IN')}</td>
            </tr>
            ` : ''}

            <!-- Grand Total -->
            <tr style="background: #e8e8e8; font-weight: bold;">
              <td style="border: 1px solid #ddd; padding: 10px; font-size: 10pt; text-align: center;" colspan="2">GRAND TOTAL</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right; font-size: 11pt;">
                ₹${quotation.totalAmount.toLocaleString('en-IN')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Additional Notes Section -->
      ${quotation.notes ? `
      <div style="margin-bottom: 15px; padding: 10px; background: #fff8e1; border: 1px solid #ffd54f; border-radius: 4px;">
        <h3 style="font-size: 11pt; font-weight: bold; margin: 0 0 6px 0; color: #e65100;">Special Instructions</h3>
        <p style="font-size: 9pt; margin: 0; line-height: 1.4; color: #5d4037;">${quotation.notes}</p>
      </div>
      ` : ''}

      <!-- Terms & Conditions - Two Columns -->
      <div style="margin-bottom: 15px;">
        <h3 style="font-size: 12pt; font-weight: bold; margin: 0 0 8px 0;">TERMS & CONDITIONS</h3>
        <div style="display: flex; justify-content: space-between; gap: 20px; font-size: 9pt; line-height: 1.4;">
          <!-- Column 1 -->
          <div style="flex: 1;">
            <p style="margin: 4px 0;">• Valid for 30 days from quotation date</p>
            <p style="margin: 4px 0;">• 10% advance to confirm booking</p>
            <p style="margin: 4px 0;">• All packing materials included</p>
            <p style="margin: 4px 0;">• Complete door-to-door service</p>
          </div>
          <!-- Column 2 -->
          <div style="flex: 1;">
            <p style="margin: 4px 0;">• Insurance up to ₹1,00,000 , T&C Applied</p>
            <p style="margin: 4px 0;">• Transit: 3-7 business days</p>
            <p style="margin: 4px 0;">• Electrical services as requested</p>
          </div>
        </div>
      </div>

      <!-- Footer with Booking Information and Stamp -->
      <div style="border-top: 1px solid #ddd; padding-top: 12px; margin-top: 15px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
          <!-- Left side: Compact Booking Information with QR Code -->
          <div style="flex: 1;">
            <!-- QR Code Image -->
            <div style="text-align: center; margin-bottom: 8px;">
              ${qrCodeBase64 ?
                `<img src="${qrCodeBase64}" alt="Scan to Pay ₹1,000" style="width: 80px; height: 80px; border: 1px solid #ddd; border-radius: 4px;" />` :
                `<div style="width: 80px; height: 80px; border: 1px solid #ddd; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: #f9f9f9; margin: 0 auto;">
                  <p style="font-size: 7pt; margin: 0; color: #666; text-align: center;">QR Code<br>Not Loaded</p>
                </div>`
              }
            </div>
            
            <p style="font-size: 9pt; margin: 2px 0; color: #333; font-weight: bold;">Book Instantly with Our Smart pay</p>
            <p style="font-size: 8pt; margin: 4px 0 0 0; color: #666; line-height: 1.3;">
              Secure your preferred moving date by paying a token amount of ₹1,000. 
              Contact us for payment details.
            </p>
          </div>
          
          <!-- Right side: Stamp and Signature -->
          <div style="text-align: center;">
            <div style="display: inline-block; text-align: center;">
              ${stampBase64 ?
                `<img src="${stampBase64}" alt="Company Stamp" style="width: 120px; height: 80px; object-fit: contain;" />` :
                `<div style="border: 1px solid #999; padding: 12px; background: #f9f9f9; border-radius: 4px;">
                  <p style="font-size: 8pt; margin: 0; font-weight: bold; color: #333;">COMPANY STAMP</p>
                  <p style="font-size: 7pt; margin: 4px 0 0 0; color: #666;">(Image not loaded)</p>
                </div>`
              }
              <p style="font-size: 7pt; margin: 2px 0 0 0; color: #666;">Authorized Signatory</p>
            </div>
          </div>
        </div>

        <!-- Improved Marketing Footer -->
        <div style="text-align: center; margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px; background: linear-gradient(to right, #f9f9f9, #fff, #f9f9f9);">
          <p style="font-size: 9pt; margin: 3px 0; color: #000; font-weight: bold;">
            🏆 Your Trusted Moving Partner Since 2010
          </p>
          <p style="font-size: 8pt; margin: 2px 0; color: #666;">
            📞 Call Now: +91 97770 12315 | 💬 WhatsApp: +91 97770 12315 | ✉️ Email: bookrelaxpackers@gmail.com
          </p>
          <p style="font-size: 7pt; margin: 3px 0; color: #999; font-style: italic;">
            "Making Your Move Memorable & Stress-Free" • Fast • Safe • Reliable
          </p>
        </div>
      </div>
    </div>
  `;

  // Add to document
  document.body.appendChild(pdfContainer);

  try {
    // Convert to canvas with higher scale for better quality
    const canvas = await html2canvas(pdfContainer, {
      scale: 3,
      useCORS: true,
      logging: false,
      width: pdfContainer.offsetWidth,
      height: pdfContainer.offsetHeight,
      windowWidth: pdfContainer.scrollWidth,
      windowHeight: pdfContainer.scrollHeight,
      backgroundColor: '#ffffff',
      useCORS: true,
      allowTaint: true
    });

    // Create PDF
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add image to PDF
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

    // Save PDF
    pdf.save(`Quotation-${quotation.quotationNumber}.pdf`);

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  } finally {
    // Clean up
    document.body.removeChild(pdfContainer);
  }
};