import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const at = process.env.at;

app.get("/categories/:categoryname/products", async (req, res) => {
    const { companyname, top, minPrice, maxPrice } = req.query;
    const { categoryname } = req.params;
    const apiUrl = `http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Authorization": `Bearer ${at}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const responseData = await response.json();
        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
