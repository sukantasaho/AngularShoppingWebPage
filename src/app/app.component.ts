import { Component } from '@angular/core';
import { Products } from './ProductApiInterface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

      title="Welcome Sukanta";
      public products : Products[] = [];
      public category:string=""
      public categories:string[] = [];
      public flag = false;
      public selectFlag = false;
      public isCartItemVisible = false;
      public cartItemsCount:number = 0;
      public itemMsg = "item";
      public totalPrice = 0;
      public cartItems: Products[] = [];
      public paymentWithSubtotalFlag = false;
      
      public ngOnInit():void{
        this.isCartItemVisible = false;
        this.GetAllCategories('https://fakestoreapi.com/products/categories');
        this.LoadProducts('https://fakestoreapi.com/products');
        this.GetCartItemsCount();
        this.GetItemMsgBasedOnCartItemCount();
        this.CalculateCartItemPrice();
      }
      RemoveCartItem(id:number){
         //console.log(id);
         var confirmation = confirm("Are you sure to remove?")
         if(confirmation){
          this.cartItems.splice(id, 1);
          this.GetCartItemsCount();
          if(this.cartItemsCount>1)
            this.itemMsg = "Items";
          else
          this.itemMsg = "Item";
          }
          this.CalculateCartItemPrice();
          if(this.cartItemsCount==0)
               this.ToggleCart();
      }   
      CalculateCartItemPrice(){
        let total = 0;
        for(let item of this.cartItems){
              total = total+item.price;
        }
        this.totalPrice = Math.round(total);
        console.log(this.totalPrice);
      }
      public GetItemMsgBasedOnCartItemCount():void{
          if(this.cartItemsCount>1)
              this.itemMsg = "Items";
          else this.itemMsg = "Item";
      }
      //get all categories
      public GetAllCategories(categoriesUrl:string):void {
          fetch(categoriesUrl)
              .then(res=>res.json())
              .then(data=>{
                 data.unshift('all');
                 this.categories = data;
           })
      }
      //load all products based on url
      public LoadProducts(productsUrl:string):void {
        console.log(productsUrl);
           fetch(productsUrl)
             .then(res=>res.json())
             .then(data=>{
                  this.products = data;
           });
           this.selectFlag = true; 
           this.flag = true;
           this.isCartItemVisible = false;
      }
      //it is assigning cart item count
      public GetCartItemsCount():void {
        this.cartItemsCount = this.cartItems.length;
        if(this.cartItemsCount>0) {
               this.isCartItemVisible = true;
               this.flag = false;
               this.selectFlag = false;
               this.paymentWithSubtotalFlag = true;
               
        }
        else
        {
          this.flag = true;
          this.selectFlag = true;
        }
      }   
      //this functionality get grid data based on category selection
      public CategoryChanged(categoryName:string):void{
           console.log(categoryName);
           if(categoryName == "all"){
              this.LoadProducts('https://fakestoreapi.com/products');
                
            }
            else if(categoryName == "electronics" || categoryName =="men's clothing" || categoryName =="women's clothing" || categoryName=="jewelery"){
              this.LoadProducts(`https://fakestoreapi.com/products/category/${categoryName}`);
            }
            else{
                this.flag = true; 
                this.isCartItemVisible = false;
                this.selectFlag = true;
            }
      }
      //this is add to cart functionality
      public AddToCart(id:number):void{
        
        fetch('https://fakestoreapi.com/products/'+id)
          .then(res=>res.json())
          .then(data=>{
            this.cartItems.push(data);
            this.GetCartItemsCount();
            //console.log(data);
            if(this.cartItemsCount>1){
              this.itemMsg = "Items";
            }
            this.CalculateCartItemPrice();
          });
          //this.GetItemMsgBasedOnCartItemCount();
          if(this.cartItemsCount>0)
            this.paymentWithSubtotalFlag = true;
          else
          this.paymentWithSubtotalFlag = false;
            
      }
      //this functionality enbling and hiding for cart
      public ToggleCart(){
         this.isCartItemVisible = (this.isCartItemVisible==false?true:false);
         if(this.isCartItemVisible == true && this.cartItemsCount==0){
             this.paymentWithSubtotalFlag = false;
         }
         if(this.isCartItemVisible == true)
          {
             this.flag = false;
             this.selectFlag = false;
          }
          else
          {
            this.flag = true;
            this.selectFlag = true;
          }
         console.log(this.isCartItemVisible);
      }
}





















































  /*public MatchProductCategory(category:string){
   
    if(this.category == "home" || this.category == "" || this.category == undefined){
       this.flag = false;
    }
    else if(this.category == "all" || this.category == ""){
      this.HeatProductAPI("");
    }
    else if(this.category == "electronics")
    {
      this.HeatProductAPI(`category/${this.category}`);
    }
    else if(this.category == "men's clothing"){
      this.HeatProductAPI(`category/${this.category}`);
    }
    else if(this.category == "women's clothing"){
      this.HeatProductAPI(`category/${this.category}`);
    }
    else
    this.HeatProductAPI(`category/${this.category}`);
  }
  public HeatProductAPI(categoryName:string){
   
    fetch(`https://fakestoreapi.com/products/${categoryName}`)
    .then(res=>res.json())
    .then(data=>{
     this.products = data;
    });
    this.flag = true;
  }*/
   /*console.log(categoryName);
        switch(categoryName){
          case "all":
          {
            this.LoadProducts('https://fakestoreapi.com/products');
            this.flag = true;
            break;
          }
          case "home":
          {
              this.flag = false
              break;
          }
          default : 
          {
            this.LoadProducts(`https://fakestoreapi.com/products/category/${categoryName}`);
          }
        }*/
           //this.category = event.target.name;

           // else {
            //   if(categoryName == "all"){
            //     this.LoadProducts('https://fakestoreapi.com/products');
            //     this.flag = true;
            //     this.selectFlag = true; 
            //   }
            //   else if(categoryName == "electronics" || categoryName =="men's clothing" || categoryName =="women's clothing" || categoryName=="jewelery"){
            //     this.LoadProducts(`https://fakestoreapi.com/products/category/${categoryName}`);
            //     this.flag = true;
            //     this.selectFlag = true;             
            //   }
            //   else {
            //     this.flag = false; 
            //     this.isCartItemVisible = false;
            //     this.selectFlag = false;
            //   }
            // }

