"use client";


import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateQuotationPDF = async (quotation) => {
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
    const transportTotal = (quotation.transportation.householdGoods.charge || 0) + (quotation.transportation.carTransport.charge || 0);
    const servicesTotal = Object.values(quotation.services).reduce((sum, val) => sum + (val || 0), 0);
    const subtotal = transportTotal + servicesTotal;

    return {
      transportTotal,
      servicesTotal,
      subtotal,
      totalAmount: quotation.totalAmount
    };
  };

  const totals = calculateTotals();
  const activeServices = Object.entries(quotation.services).filter(([_, value]) => value > 0);

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
  const [logoBase64, stampBase64] = await Promise.all([
    loadImageAsBase64('https://relaxgroup.in/images/relax-logo-removebg.png'),
    loadImageAsBase64('./images/relax-brand-stamp.png')
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

      <!-- Customer Details without box -->
      <div style="margin-bottom: 15px;">
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

      <!-- Personalized Message -->
      <div style="margin-bottom: 18px; padding: 12px; background: #f9f9f9; border-left: 4px solid #000; border-radius: 0 4px 4px 0;">
        <p style="font-size: 10pt; margin: 0; line-height: 1.4;">
          Dear <strong>${quotation.customer.gender === 'Male' ? 'Mr.' : 'Ms.'} ${quotation.customer.name}</strong>,
        </p>
        <p style="font-size: 10pt; margin: 6px 0 0 0; line-height: 1.5;">
          We thank you for your valuable enquiry for transportation of your Household Goods & Car from 
          <strong>${quotation.fromLocation}</strong> To <strong>${quotation.toLocation}</strong>. 
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
            <!-- Household Goods -->
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center; vertical-align: top;">1</td>
              <td style="border: 1px solid #ddd; padding: 8px; vertical-align: top;">
                <strong>Household Goods Transportation</strong>
                ${quotation.transportation.householdGoods.volume ? `<br><span style="font-size: 8pt; color: #666;">Volume: ${quotation.transportation.householdGoods.volume}</span>` : ''}
              </td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right; vertical-align: top; font-weight: bold;">
                ${quotation.transportation.householdGoods.charge?.toLocaleString('en-IN')}
              </td>
            </tr>

            <!-- Car Transport - Only if applicable -->
            ${quotation.transportation.carTransport.charge > 0 ? `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center; vertical-align: top;">2</td>
              <td style="border: 1px solid #ddd; padding: 8px; vertical-align: top;">
                <strong>Car Transportation</strong>
              </td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right; vertical-align: top; font-weight: bold;">
                ${quotation.transportation.carTransport.charge?.toLocaleString('en-IN')}
              </td>
            </tr>
            ` : ''}

            <!-- Services -->
            ${activeServices.length > 0 ? `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center; vertical-align: top;">${quotation.transportation.carTransport.charge > 0 ? '3' : '2'}</td>
              <td style="border: 1px solid #ddd; padding: 8px; vertical-align: top;">
                <strong>Ancillary Services</strong>
                <div style="font-size: 8pt; margin-top: 4px; color: #555;">
                  ${activeServices.map(([key, value]) => `
                    <div style="display: flex; justify-content: space-between; padding: 2px 0;">
                      <span style="text-transform: capitalize;">${key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span>₹${value.toLocaleString('en-IN')}</span>
                    </div>
                  `).join('')}
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
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${activeServices.length > 0 ? '4' : '3'}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">FOV @${quotation.taxes.fov.percentage}%</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${quotation.taxes.fov.amount.toLocaleString('en-IN')}</td>
            </tr>
            ` : ''}

            ${quotation.taxes.surcharge.amount > 0 ? `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${activeServices.length > 0 ? '5' : '4'}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Surcharge @${quotation.taxes.surcharge.percentage}%</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${quotation.taxes.surcharge.amount.toLocaleString('en-IN')}</td>
            </tr>
            ` : ''}

            ${quotation.taxes.gst.amount > 0 ? `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${activeServices.length > 0 ? '6' : '5'}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">GST @${quotation.taxes.gst.percentage}%</td>
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

      <!-- Terms & Conditions - Two Columns -->
      <div style="margin-bottom: 15px;">
        <h3 style="font-size: 12pt; font-weight: bold; margin: 0 0 8px 0;">TERMS & CONDITIONS</h3>
        <div style="display: flex; justify-content: space-between; gap: 20px; font-size: 9pt; line-height: 1.4;">
          <!-- Column 1 -->
          <div style="flex: 1;">
            <p style="margin: 4px 0;">• Valid for 30 days from quotation date</p>
            <p style="margin: 4px 0;">• 20% advance to confirm booking</p>
            <p style="margin: 4px 0;">• All packing materials included</p>
          </div>
          <!-- Column 2 -->
          <div style="flex: 1;">
            <p style="margin: 4px 0;">• Insurance up to ₹2,00,000 included</p>
            <p style="margin: 4px 0;">• Transit: 3-7 business days</p>
            <p style="margin: 4px 0;">• Complete door-to-door service</p>
          </div>
        </div>
      </div>

      <!-- Footer with actual stamp -->
      <div style="border-top: 1px solid #ddd; padding-top: 12px; margin-top: 15px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
          <div style="flex: 1;">
            <p style="font-size: 9pt; margin: 2px 0; color: #333;"><strong>For RELAX PACKERS & MOVERS</strong></p>
            <p style="font-size: 8pt; margin: 15px 0 0 0; color: #666;">
              Trusted Service | Safe Handling | On-Time Delivery
            </p>
          </div>
          
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
            ✨ 5000+ Happy Families | 98% Customer Satisfaction | 🚚 24/7 Customer Support
          </p>
          <p style="font-size: 8pt; margin: 2px 0; color: #666;">
            📞 Call Now: +91 97770 12315 | 💬 WhatsApp: +91 97770 12315 | ✉️ Email: bookrelaxpackers@gmail.com
          </p>
          <p style="font-size: 7pt; margin: 3px 0; color: #999; font-style: italic;">
            "Making Your Move Memorable & Stress-Free" • Generated on ${new Date().toLocaleDateString('en-IN')}
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