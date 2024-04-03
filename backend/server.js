import express from "express";

import dotenv from "dotenv";

const app = express();
dotenv.config();

const at = process.env.at;

async function bufferFunction(company, categoryname, top, minPrice, maxPrice) {
    const apiUrl = `http://20.244.56.144/test/companies/${company}/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

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
        const datas = [...responseData];
        const datas_id = datas.map((data, buffer) => {
            return { ...data, id: buffer + 1 };
        });

        return datas_id;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Internal server error');
    }
}

app.get("/categories/:categoryname/products", async (req, res) => {
    const { company, top, minPrice, maxPrice } = req.query;
    const { categoryname } = req.params;

    try {
        const datas_id = await bufferFunction(company, categoryname, top, minPrice, maxPrice);
        res.status(200).json(datas_id);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/categories/:categoryname/products/:productid", async (req, res) => {
    const { productid } = req.params;
    const productId = parseInt(productid);

    try {
        const datas_id = await bufferFunction(company, categoryname, top, minPrice, maxPrice);
        const product = datas_id.find(product => product.id === productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
