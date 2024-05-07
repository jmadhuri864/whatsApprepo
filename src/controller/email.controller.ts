import puppeteer from 'puppeteer';
import { NextFunction, Response, Request } from "express";
import { sendEmail } from "../utils/sendEmail";
import * as htmlToImage from 'html-to-image';
import * as fs from 'fs';
import { JSDOM } from 'jsdom';
export const orderemailController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderData = req.body; // Assuming the order data is sent in the request body

        // Generate HTML table
        const htmlTable = generateHTMLTable(orderData);

        // Launch a headless browser
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set the content of the page to the HTML table
        await page.setContent(htmlTable);

        // Render the page as a PNG image
        const imageBuffer = await page.screenshot({ type: 'png' });

        // Close the browser
        await browser.close();

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

function generateHTMLTable(orderData: any): string {
    // Start with an empty string to store the HTML
    let html = '';

    // Add the cuisine name as a heading
    html += `<h2>${orderData.name}</h2>`;

    // Iterate over each dish in the order
    orderData.dishes.forEach((dish: any) => {
        // Add the dish name as a subheading
        html += `<h3>${dish.name}</h3>`;

        // Start a table for the ingredients
        html += '<table>';

        // Iterate over each ingredient in the dish
        dish.ingredients.forEach((ingredient: any) => {
            // Add a row to the table for each ingredient
            html += `
                <tr>
                    <td>${ingredient.name}</td>
                    <td>${ingredient.quantity} ${ingredient.units}</td>
                </tr>
            `;
        });

        // Close the table for the current dish
        html += '</table>';
    });

    return html;
}
