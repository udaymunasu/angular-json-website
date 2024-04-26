import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product, cart } from '../data-types';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;

  reviewText: string = '';
  ratingValue: number | undefined;

  reviews: any[] = [];
  userId: number;
  productId: any

  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductsService
  ) {}

  ngOnInit(): void {
    debugger
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    this.productId = productId
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        this.productData = result;
        console.warn('this.productData', this.productData);

        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: product) => productId === item.id.toString()
          );
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }

        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);

          this.product.cartData.subscribe((result) => {
            let item = result.filter(
              (item: product) =>
                productId?.toString() === item.productId?.toString()
            );
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            }
          });
        }
      });
      this.getReviews()
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId,
        };
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId);
    } else {
      console.warn('cartData', this.cartData);

      this.cartData &&
        this.product.removeToCart(this.cartData.id).subscribe((result) => {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
        });
    }
    this.removeCart = false;
  }

  submitReview() {
    if (this.productData) {
      if (this.ratingValue && this.reviewText) {
        let user: any = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;

        console.log('userId in review', userId, user);
        const reviewData: any = {
          userData: JSON.parse(user),
          productId: this.productData.id,
          rating: this.ratingValue,
          review: this.reviewText,
          userId: userId,
        };
        console.log("reviewData", reviewData)
        this.product.submitReview(reviewData).subscribe(
          (result) => {
            console.log('Review submitted successfully:', result);
            this.ratingValue = undefined;
            this.reviewText = '';
          },
          (error) => {
            console.error('Error submitting review:', error);
          }
        );
      } else {
        console.error('Rating and review are required.');
      }
    }
  }

  getReviews() {
    this.product.getReviewsByProduct(this.productId).subscribe(
      (reviews) => {
        this.reviews = reviews;
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }
}
