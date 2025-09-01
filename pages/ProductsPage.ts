import { Page, Locator } from '@playwright/test';


export class ProductsPage {
  readonly page: Page;

  // Header
  readonly allProductsTitle: Locator;

  // Product grid
  readonly productCards: Locator;
  readonly firstProductCard: Locator;
  readonly firstProductViewButton: Locator;

  // Search
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsTitle: Locator;

  // Categories
  readonly categorySidebar: Locator;
  readonly womenCategory: Locator;
  readonly menCategory: Locator;
  readonly kidsCategory: Locator;

  //Product detailContainer
  readonly productInformation: Locator;

  // Brands
  readonly brandList: Locator;

  // Buttons
  readonly viewCartButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header title inside .features_items
    this.allProductsTitle = page.locator('div.features_items h2:has-text("All Products")');

    // Product cards
    this.productCards = page.locator('div.features_items .col-sm-4');
    this.firstProductCard = this.productCards.first();
    this.firstProductViewButton = this.firstProductCard.locator('a:has-text("View Product")');

    // Search
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsTitle = page.locator('div.features_items h2:has-text("Searched Products")');

    // Categories
    this.categorySidebar = page.locator('.left-sidebar');
    this.womenCategory = this.categorySidebar.locator('a:has-text("Women")');
    this.menCategory = this.categorySidebar.locator('a:has-text("Men")');
    this.kidsCategory = this.categorySidebar.locator('a:has-text("Kids")');

    // Brands
    this.brandList = page.locator('.brands_products .nav-pills li');

    // Product detail container
    this.productInformation = page.locator('div.product-information');

    // Buttons
    this.viewCartButton = page.locator('u:has-text("View Cart")');
    this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
 
  }

  async goTo() {
    await this.page.goto('https://automationexercise.com/products');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async viewFirstProduct() {
    await this.firstProductViewButton.click();
  }

  async searchProduct(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async addProductToCart(index: number) {
    const product = this.productCards.nth(index);
    await product.hover();
    await product.locator('a.btn.add-to-cart[data-product-id="1"]').click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async clickViewCart() {
    await this.viewCartButton.click();
  }
}
