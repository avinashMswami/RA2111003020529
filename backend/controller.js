
import express from "express";


const router = express.Router();





router.get('/', async (req, res) => {
    try {
        const { companyname, categoryname, top, minPrice, maxPrice } = req.query;
        const apiUrl = `http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
        
       
        const response = await fetch(apiUrl);
        
        
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const products = await response.json();

      
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default router;