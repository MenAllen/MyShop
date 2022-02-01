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
			liked: []
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
				this.products = response.data.results;
			})
			.catch(err => {
				this.notyf.error("Erreur Display " + err.response.status + " " + err.response.statusText);
			})
		},

		setLikeCookie() {
			setTimeout(() => {
				$cookies.set("like", JSON.stringify(this.liked));
			}, 300);
		},

		deleteArticle(product) {
			let username = localStorage.getItem('username');

			if (username === product.articleUsername) {

				axios.delete('http://localhost:3000/api/article/' + product.id, {
					headers: {
							'Content-Type' : 'application/json',
							'Authorization': 'Bearer ' + localStorage.getItem('token')
					}
				})
				.then(() => {
					this.notyf.success("Article supprimé");
					this.getArticles();
				})
				.catch(err => {
					this.notyf.error("Echec de suppression");
				})

			} else {
				this.notyf.error("Suppression interdite")
			}
		},
	},
};

// =========================================================================================================

const CreateCard = {
	template: "#CreateCard",
	name: "CreateCard",
	data: () => {
		return {
			titre: '',
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

			formData.append("titre", this.titre);
			formData.append("description", this.description);
			formData.append("price", this.price);
			formData.append("type", this.type);
			formData.append("quantity", 1);			
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
	template: "#ShoppingCart",
	name: "ShoppingCart",

	created() {
		this.notyf = new Notyf({
			position: {
				x: 'center',
				y: 'top'
			}
		});				
	},

	methods: {

		backToShopping() {
			this.$router.push("/display-carts");
		},

		processOrder(totalprice) {

			if (totalprice != 0) {
				axios.post('http://localhost:3000/api/order', {
					username: localStorage.getItem('username'),
					totalprice: totalprice,
					articles: this.$store.state.cart
				},				
				{ headers: {
					'Content-Type' : 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('token')
					}
				})
				.then(() => {
					this.notyf.success("Commande transmise")
					this.	$store.commit('removeCart');
					this.$router.push("/display-carts");
				})
				.catch(err => {
					this.notyf.error("Erreur Process Order " + err.response.status + " " + err.response.statusText);
					this.$router.push("/display-carts");
				})
			} else {
				this.notyf.success("Votre paner est vide !")
			}
		},
	}
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

const store = new Vuex.Store({
	state: {
			cart: [],
	},

	mutations: {

		addProductToCart(state, product) {

			const duplicatedProductIndex = state.cart.findIndex(item => item.id === product.id);

			if (duplicatedProductIndex !== -1) {
				state.cart[duplicatedProductIndex].articleQuantity++;
				return;
			}

			product.qty = 1;
			state.cart.push(product);
		},

		subProductToCart(state, product) {

			const duplicatedProductIndex = state.cart.findIndex(item => item.id === product.id);

			if (duplicatedProductIndex !== -1) {
				state.cart[duplicatedProductIndex].articleQuantity--;
			}

			if (state.cart[duplicatedProductIndex].articleQuantity === 0) {
				state.cart.splice(duplicatedProductIndex, 1);
			}
		},

		removeProductToCart(state, index) {
			state.cart.splice(index, 1);
		},

		removeCart(state) {
		 state.cart.splice(0, state.cart.length);
		}

	},

	getters: {

    cartTotalAmount(state) {
			let total = 0;
			for (item in state.cart) {
				total = total + (state.cart[item].articleQuantity * state.cart[item].articlePrice);
			}
			return total;
		},

		itemTotalAmount(state) {
			let itemTotal = 0;
			for (item in state.cart) {
				itemTotal = itemTotal + state.cart[item].articleQuantity;
			}
			return itemTotal;
		},

		idTotalAmount: (state) => (id) => {			
			return state.cart[id].articleQuantity * state.cart[id].articlePrice;
		},

	}	
});


const vue = new Vue({
	router,
	store,
}).$mount("#app");
