// data

const prodicts = [
	{ id: 1, description: "Quarz Luxe", price: 12, img: "assets/img/quarz-luxe.JPG" },
	{ id: 2, description: "Curren Business", price: 20, img: "assets/img/curren-business.JPG" },
	{ id: 3, description: "Curren Sport", price: 5, img: "assets/img/curren-sport.JPG" },
	{ id: 4, description: "Jaragar Racing", price: 8, img: "assets/img/jaragar-racing.JPG" },
	{ id: 5, description: "Liges Hommes", price: 3, img: "assets/img/liges-hommes.JPG" },
	{ id: 6, description: "Maserati Mechanical", price: 65, img: "assets/img/maserati-mechanical.JPG" },
	{ id: 7, description: "Montre Mecanique", price: 25, img: "assets/img/montre-mecanique.JPG" },
	{ id: 8, description: "Brand Designer", price: 28, img: "assets/img/brand-designer.JPG" },
	{ id: 9, description: "Relogio Masculino", price: 4, img: "assets/img/relogio-masculino.JPG" },
	{ id: 10, description: "Tissot Multifunction", price: 29, img: "assets/img/tissot-multifunction.JPG" },
	{ id: 11, description: "Hip Hop Gold", price: 87, img: "assets/img/hiphop-gold.JPG" },
	{ id: 12, description: "Mesh Genova", price: 6, img: "assets/img/mesh-genova.JPG" },
];

// =========================================================================================================

const Home = {
	template: "<h1>Home</h1>",
	name: "Home",
};

// =========================================================================================================

const UserSettings = {
	template: "#UserSettings",
	name: "UserSettings",
	data: () => {
		return {
			username: "",
			password: "",
			passwordBis: "",
			email: "",
			status: ""
		};
	},
	created() {
		this.notyf = new Notyf({
			position: {
				x: 'center',
				y: 'top'
			}
		});
  },
	mounted() {
    if(localStorage.status) {
			this.status = localStorage.status;
			document.querySelector(".fa-user").style.color = "rgb(0,128,0)";
			document.querySelector(".fa-plus").style.color = "rgb(0,128,0)";
		} else {
			document.querySelector(".fa-user").style.color = "black";
			document.querySelector(".fa-plus").style.color = "black";
		}
    if(localStorage.username) this.username = localStorage.username;
    if(localStorage.isAdmin) this.isAdmin = localStorage.isAdmin;
    if(localStorage.email) this.email = localStorage.email;
  },
	methods: {
		// signin: Connection et récupération des infos du username dans localStorage
		signin() {
			axios.post("http://localhost:3000/api/user/login", {
					username: this.username,
					password: this.password,
				})
				.then((response) => {
					localStorage.setItem("token", response.data.token);
					localStorage.setItem("userId", response.data.userId);
					localStorage.setItem("username", this.username);
					localStorage.setItem("email", response.data.email);					
					localStorage.setItem("isAdmin", response.data.isAdmin);
					localStorage.setItem("status", 'connected');
					this.notyf.success(this.username + " connected");
					document.getElementById("form-signin").reset();
					document.querySelector(".fa-user").style.color = "rgb(0,128,0)";
					this.$router.push("/display-carts");
				})
        .catch(err => {
          this.notyf.error("Connexion failed" + err.response.status + " " + err.response.statusText);
        })
		},
		// signup: Création d'un nouvel user dans la base
    signup() {
      axios.post('http://localhost:3000/api/user/signup', {
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .then(() => {
				this.notyf.success("User " + this.username + " created");
				document.getElementById("form-signup").reset();
//				setTimeout(window.location.reload(), 3000); //On attend 3 secondes avant d'exécuter la fonction
      })
      .catch(err => {
        this.notyf.error("Erreur Signup " + err.response.status);
      })
		},
		signout() {
      axios.post('http://localhost:3000/api/user/signout', {
        username: this.username
      })
      .then(() => {

				this.notyf.success("User " + this.username + " disconnected");

				this.status = '';
				this.username = '';
				this.email = '';
				localStorage.setItem("status", '');
				localStorage.setItem("token", '');
				localStorage.setItem("userId", '');
				localStorage.setItem("username", '');
				localStorage.setItem("email",'');					
				localStorage.setItem("isAdmin", false);

				document.querySelector(".fa-user").style.color = "black";
				document.querySelector(".fa-plus").style.color = "black";
	
      })
      .catch(err => {

        this.notyf.error("Erreur Signout " + err.response.status);

				this.status = '';
				this.username = '';
				this.email = '';
				localStorage.setItem("status", '');
				localStorage.setItem("token", '');
				localStorage.setItem("userId", '');
				localStorage.setItem("username", '');
				localStorage.setItem("email",'');					
				localStorage.setItem("isAdmin", false);

				document.querySelector(".fa-user").style.color = "black";
				document.querySelector(".fa-plus").style.color = "black";
	
      })
		},
		cancelSignout() {
			this.$router.push("/display-carts");
		},
	},

};

// =========================================================================================================

const DisplayCarts = {
	template: "#DisplayCarts",
	name: "DisplayCarts",
	data: () => {
		return {
			products: [],
			searchKey: "",
			liked: [],
			cart: [],
		};
	},

	created() {

		this.getArticles();
		this.notyf = new Notyf({
			position: {
				x: 'center',
				y: 'top'
			}
		});				
	},

	computed: {
		filteredList() {
			return this.products.filter((product) => {
				return product.articleDescription.toLowerCase().includes(this.searchKey.toLowerCase());
			});
		},
		getLikeCookie() {
			let cookieValue = JSON.parse($cookies.get("like"));
			cookieValue == null ? (this.liked = []) : (this.liked = cookieValue);
		},
		cartTotalAmount() {
			let total = 0;
			for (item in this.cart) {
				total = total + (this.cart[item].quantity * this.cart[item].price);
			}
			return total;
		},
		itemTotalAmount() {
			let itemTotal = 0;
			for (item in this.cart) {
				itemTotal = itemTotal + this.cart[item].quantity;
			}
			return itemTotal;
		}
	},
	mounted: () => {
		this.getLikeCookie;
	},

	methods: {
	// Permet d'afficher tous les articles
    getArticles() {
			axios.get('http://localhost:3000/api/article', {
				headers: {
					'Content-Type' : 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
			})
			.then(response => { 
				console.log(response);
				this.products = response.data.results;
			})
			.catch(err => {
				this.notyf.error("Erreur Display " + err.response.status + " " + err.response.statusText);
				console.log(err.response);
//				window.location.reload();
			})
		},

		setLikeCookie() {
			setTimeout(() => {
				$cookies.set("like", JSON.stringify(this.liked));
			}, 300);
		},
		addToCart(product) {
			// Check if already in cart
			for (let i = 0; i < this.cart.length; i++) {
				if (this.cart[i].id === product.id) {
					return this.cart[i].quantity++;
				}
			}
			this.cart.push({
				id: product.id,
				img: product.articleUrl,
				description: product.articleDescription,
				price: product.articlePrice,
				quantity: 1,
			});
			console.log(this.cart[0]);
		},
		cartPlusOne(product) {
			product.quantity = product.quantity + 1;
		},
		cartMinusOne(product, id) {
			if (product.quantity == 1) {
				this.cartRemoveItem(id);
			} else {
				product.quantity = product.quantity - 1;
			}
		},
		cartRemoveItem(id) {
			this.$delete(this.cart, id);
		},
	},
};

// =========================================================================================================

const CreateCard = {
	template: "#CreateCard",
	name: "CreateCard",
	data: () => {
		return {
			description: '',
			price: 0,
			type: '',
			currentUser: localStorage.username,
			imagePreview: null,
			imagePost: '',
		};
	},
	created() {
		this.notyf = new Notyf({
			position: {
				x: 'center',
				y: 'top'
			}
		});
	},
	methods: {

		uploadFile() {
			this.$refs.fileUpload.click()
		},

		onFileSelected(event) {
			this.imagePost = event.target.files[0];
			this.imagePreview = URL.createObjectURL(this.imagePost);
		}, 

		createArticle() {
			const formData = new FormData();

			formData.append("description", this.description);
			formData.append("price", this.price);					
			formData.append("image", this.imagePost);
			formData.append("username", this.currentUser);			

			axios.post('http://localhost:3000/api/article', formData, {
					headers: {
							'Content-Type': 'multipart/form-data',
							'Authorization': 'Bearer ' + localStorage.getItem('token')
					}
			})
			.then(() => {
					this.$router.push("/display-carts");
			})
			.catch(err => {
					this.notyf.error("Erreur Create " + err.response.status + " " + err.response.statusText);
					this.$router.push("/display-carts");
			})
		},
		cancelCreateArticle() {
			this.$router.push("/display-carts");
		},
	}
};

// =========================================================================================================

const ShoppingCart = {
	template: "<h1>Shopping Cart</h1>",
	name: "ShoppingCart",
};

const router = new VueRouter({
	routes: [
		{ path: "/", component: Home, name: "Home" },
		{ path: "/user-settings", component: UserSettings, name: "UserSettings" },
		{ path: "/display-carts", component: DisplayCarts, name: "DisplayCarts" },
		{ path: "/create-card", component: CreateCard, name: "CreateCard" },
		{ path: "/shopping-cart", component: ShoppingCart, name: "ShoppingCart" },
	],
});

Vue.prototype.$statusApp = 'Disconnected';

const vue = new Vue({
	router,
}).$mount("#app");
