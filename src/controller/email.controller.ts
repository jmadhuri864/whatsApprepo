import puppeteer from 'puppeteer';
import { NextFunction, Response, Request } from "express";
import { sendEmail } from "../utils/sendEmail";
import * as htmlToImage from 'html-to-image';
import * as fs from 'fs';
import { JSDOM } from 'jsdom';
export const orderemailController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderData = req.body; // Assuming the order data is sent in the request body
console.log(orderData);
        // Generate HTML table
        const htmlTable = generateHTMLTable(orderData);
console.log(htmlTable);
        // Launch a headless browser
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set the content of the page to the HTML table
        await page.setContent(htmlTable);

        // Render the page as a PNG image
        const imageBuffer = await page.screenshot({ type: 'png' });

        // Close the browser
        await browser.close();
           //
           //
           
        

        // Send email with image attachment
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: 'jadhavmadhuri2525@gmail.com', // Replace with recipient's email address
            subject: 'Order Details',
            text: 'Please find attached the order details.',
            attachments: [{ filename: 'order.png', content: imageBuffer }]
        };

        await sendEmail(mailOptions);

        res.send('Email sent successfully');
    } catch (error:any) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email: ' + error.message); // Provide error message to client
    }
};

// function generateHTMLTable(orderData: any): string {
//     // Start with an empty string to store the HTML
//     let html = '';

//     // Add the cuisine name as a heading
//     html += `<h2>${orderData.name}</h2>`;

//     // Iterate over each dish in the order
//     orderData.dishes.forEach((dish: any) => {
//         // Add the dish name as a subheading
//         html += `<h3>${dish.name}</h3>`;

//         // Start a table for the ingredients
//         html += '<table>';

//         // Iterate over each ingredient in the dish
//         dish.ingredients.forEach((ingredient: any) => {
//             // Add a row to the table for each ingredient
//              // Check if the ingredient has the quantity and units properties
//              const quantity = ingredient.quantity ? ingredient.quantity.quantity: '';
//              //const units = ingredient.units ? ingredient.units.units : '';
//              const units =ingredient.quantity && ingredient.quantity.units ? ingredient.quantity.units : '';
//              console.log("quantity is 1",quantity);
//              console.log("units for tomato",units)
//             html += `
//                 <tr>
//                     <td>${ingredient.name}</td>
//                     <td>${quantity} </td>
//                     <td>${units}</td>
//                 </tr>
//             `;
//         });

//         // Close the table for the current dish
//         html += '</table>';
//     });

//     return html;
// }


// function generateHTMLTable(orderData: any): string {
//     // Start with an empty string to store the HTML
//     let html = '';

//     // Add the cuisine name as a heading
//     //html += `<h2>${orderData.name}</h2>`;

//     // Iterate over each dish in the order
//     orderData.ingredient.forEach((ingredient: any) => {
//         // Add the dish name as a subheading
//         //html += `<h3>${dish.name}</h3>`;

//         // Start a table for the ingredients with CSS styling
//         html += '<table style="border-collapse: collapse; width: 100%; text-align: left; border: 1px solid #ddd; margin-bottom: 20px;">';
        
//         // Add column headers with CSS styling
//         html += `
//             <tr style="background-color: #f2f2f2;">
//                 <th style="padding: 8px;">Ingredient Name</th>
//                 <th style="padding: 8px;">Quantity</th>
//                 <th style="padding: 8px;">Units</th>
//             </tr>
//         `;

//         // Iterate over each ingredient in the dish
//         ingredient.ingredients.forEach((ingredient: any) => {
//             // Extract quantity and units from the ingredient object
//             const quantity = ingredient.quantity ? ingredient.quantity.quantity : '';
//             const units = ingredient.quantity && ingredient.quantity.units ? ingredient.quantity.units : '';
            
//             // Add a row to the table for each ingredient with CSS styling
//             html += `
//                 <tr>
//                     <td style="border: 1px solid #ddd; padding: 8px;">${ingredient.name}</td>
//                     <td style="border: 1px solid #ddd; padding: 8px;">${quantity}</td>
//                     <td style="border: 1px solid #ddd; padding: 8px;">${units}</td>
//                 </tr>
//             `;
//         });

//         // Close the table for the current dish
//         html += '</table>';
//     });

//     return html;
// }
function generateHTMLTable(orderData: any): string {
    // Start with an empty string to store the HTML
    let html = '';

    // Start a div to center-align the heading
    html += '<div style="text-align: center;">';
    html += `<h1>Order List</h1>`;
    html += '</div>';

    // Start a table for the ingredients with CSS styling
    html += '<table style="border-collapse: collapse; width: 100%; text-align: left; border: 1px solid #ddd; margin-bottom: 20px;">';
    
    // Add column headers with CSS styling
    html += `
        <tr style="background-color: #f2f2f2;">
            <th style="padding: 8px;">ID</th>
            <th style="padding: 8px;">Ingredient Name</th>
            <th style="padding: 8px;">Quantity</th>
            <th style="padding: 8px;">Units</th>
        </tr>
    `;

    // Variable to keep track of the ingredient ID
    let ingredientId = 1;

    // Check if orderData.ingredients exists and is not empty
    if (orderData.ingredients && orderData.ingredients.length > 0) {
        // Iterate over each ingredient in the orderData
        orderData.ingredients.forEach((ingredient: any) => {
            // Extract quantity and units from the ingredient object
            const quantity = ingredient.quantity ? ingredient.quantity.quantity : '';
            const units = ingredient.quantity && ingredient.quantity.units ? ingredient.quantity.units : '';
            
            // Add a row to the table for each ingredient with CSS styling
            html += `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${ingredientId}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${ingredient.name}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${quantity}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${units}</td>
                </tr>
            `;

            // Increment the ingredient ID for the next iteration
            ingredientId++;
        });
    } else {
        // If there are no ingredients, display a message in the first column
        html += `
            <tr>
                <td colspan="4" style="text-align: center; border: 1px solid #ddd; padding: 8px;">No ingredients found</td>
            </tr>
        `;
    }

    // Close the table
    html += '</table>';

    return html;
}
