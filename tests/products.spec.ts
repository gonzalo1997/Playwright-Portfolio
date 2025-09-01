import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Products page', () => {
    test('Should display products and navigate to the first product detail', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await productsPage.goTo();

        await expect(productsPage.allProductsTitle).toBeVisible();

        await expect(productsPage.firstProductCard).toBeVisible();

        await productsPage.viewFirstProduct();

        // Verify navigation to product detail page
        await expect(page).toHaveURL(/\/product_details\//);
        await expect(productsPage.productInformation).toBeVisible();
    });
});

test.describe('Search product in Automation Exercise', () => {
    test('Should search for a product and display related results', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await productsPage.goTo();

        // Search for a product
        const searchTerm = 'men';
        await productsPage.searchProduct(searchTerm);

        // Verify 'SEARCHED PRODUCTS' is visible
        await expect(productsPage.searchedProductsTitle).toBeVisible();

        // Verify products contain the search term
        const searchedItems = page.locator('.features_items .col-sm-4');
        const count = await searchedItems.count();
        expect(count).toBeGreaterThan(0);
        for (let i = 0; i < count; i++) {
            const productText = await searchedItems.nth(i).textContent();
            expect(productText?.toLowerCase()).toContain(searchTerm.toLowerCase());
        }
    });
});

test.describe('Add multiple products to cart and verify details', () => {
    test('Should add two products and validate cart contents', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await productsPage.goTo();
        await productsPage.addProductToCart(0);
        await productsPage.clickContinueShopping();
        await productsPage.addProductToCart(1);
        await cartPage.navigate();

        // Verify both products are added to Cart
        const cartRows = page.locator('tr.cart_product');
        await expect(cartRows.nth(0)).toBeVisible();
        await expect(cartRows.nth(1)).toBeVisible();

        // Verify prices, quantity and total price
        for (let i = 0; i < 2; i++) {
            const price = await page.locator(`tr:nth-child(${i + 2}) .cart_price p`).textContent();
            const quantity = await page.locator(`tr:nth-child(${i + 2}) .cart_quantity button`).textContent();
            const total = await page.locator(`tr:nth-child(${i + 2}) .cart_total p`).textContent();

            expect(price).toMatch(/Rs\.\s*\d+/);
            expect(quantity).toBe('1');
            expect(total).toMatch(/Rs\.\s*\d+/);
        }
    });
});