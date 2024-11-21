# E-commerce-React-Bootstrap
1. Users Collection : 
Stores user details, including roles for different user types (e.g., customer, seller, admin).

Field	        Type	    Description
id	            String	    User ID (Firebase Auth UID)
username	    String	    Username, unique per user
email	        String	    User email, unique per user
role	        String	    User role, e.g., customer, seller, admin
created_at	    Timestamp	Date when user was created

2. Products Collection :
Stores product details available for sale.
Field	      Type	    Description
id	          String	Auto-generated product ID
name	      String	Product name
price	      Number	Product price
image	      String	URL to product image
description	  String	Product description
sku	          String	SKU (unique identifier)
categories	  Array	    List of category names (e.g., ["Jewelry"])
stock	      Number	Quantity in stock
seller_id	  String	ID of the seller (refers to Users collection)
created_at	  Timestamp	Date when product was added


,
    {
        "categorie": "Parfum Homme",
        "description": "Fragrance fraîche, idéale pour l'été",
        "id_user": "user1",
        "image": "https://cf.shopee.co.id/file/b21421069f1043559af5e3ebcf86a307",
        "prix": "39.99",
        "titre": "Ocean Breeze"
    },
    {
        "categorie": "Parfum Homme",
        "description": "Parfum fort et intense aux notes boisées",
        "id_user": "user1",
        "image": "https://media.marionnaud.fr/medias/sys_master/prd-images/hc7/h40/11187966771230/prd-front-102170326_420x420/prd-front-102170326-420x420.png",
        "prix": "79.99",
        "titre": "Force Sauvage"
    },
    {
        "categorie": "Parfum Homme",
        "description": "Eau de parfum sophistiquée avec des notes de cuir",
        "id_user": "user1",
        "image": "https://th.bing.com/th/id/R.60413ba183f91667105db6ed902fcb82?rik=lKWJ2Fth7i6T%2fA&riu=http%3a%2f%2ffimgs.net%2fimages%2fsecundar%2fo.23526.jpg&ehk=BMnWTQy6TdwyacqK3y%2f8VzYWkbxYRKPU4HCz1%2bZIt7U%3d&risl=&pid=ImgRaw&r=0",
        "prix": "89.99",
        "titre": "Leather Essence"
    },
    {
        "categorie": "Parfum Femme",
        "description": "Un parfum doux et floral avec des touches de vanille",
        "id_user": "user2",
        "image": "https://th.bing.com/th/id/OIP.UA_R8HEyAcio2PyJHBIm4gHaGY?rs=1&pid=ImgDetMain",
        "prix": "49.99",
        "titre": "Fleur de Vanille"
    },
    {
        "categorie": "Parfum Femme",
        "description": "Fragrance florale et fruitée, idéale pour la journée",
        "id_user": "user2",
        "image": "https://th.bing.com/th/id/OIP.8GZ8djZ0SFMAwYTmPVml4wHaHa?rs=1&pid=ImgDetMain",
        "prix": "69.99",
        "titre": "Fleur d'Oranger"
    },
    {
        "categorie": "Parfum Femme",
        "description": "Parfum léger avec des notes de rose et de musc",
        "id_user": "user2",
        "image": "https://th.bing.com/th/id/OIP.qzg_-uLSqyFEBkVodCrabAAAAA?rs=1&pid=ImgDetMain",
        "prix": "55.00",
        "titre": "Rose Sauvage"
    },
    {
        "categorie": "Parfum Femme",
        "description": "Eau de parfum envoûtante avec des notes d'ambre",
        "id_user": "user2",
        "image": "https://www.crueltyfreekitty.com/wp-content/uploads/2020/09/Sugared-Amber-Dream-Spray-Perfume.jpg",
        "prix": "79.99",
        "titre": "Amber Dream"
    },
    {
        "categorie": "Parfum Femme",
        "description": "Parfum sucré et fruité avec des touches de pêche",
        "id_user": "user2",
        "image": "https://senteurs-et-merveilles-du-monde.fr/1147-large_default/parfum-femme-peche-orchidee.jpg",
        "prix": "59.99",
        "titre": "Pêche Envoûtante"
    },
    {
        "categorie": "Parfum Enfant",
        "description": "Parfum doux et sucré pour les petites filles",
        "id_user": "user3",
        "image": "https://th.bing.com/th/id/OIP.04FwLHtmNMDeyV_kfHz9sAHaHa?rs=1&pid=ImgDetMain",
        "prix": "19.99",
        "titre": "Princess Fragrance"
    },
    {
        "categorie": "Parfum Enfant",
        "description": "Un parfum léger aux notes fruitées pour les garçons",
        "id_user": "user3",
        "image": "https://th.bing.com/th/id/R.14d44c09f343f7fe1cfde8d48786c3c0?rik=Rsv37%2f%2blw2TdwQ&pid=ImgRaw&r=0",
        "prix": "14.99",
        "titre": "Little Explorer"
    },
    {
        "categorie": "Parfum Enfant",
        "description": "Parfum frais et pétillant pour enfants",
        "id_user": "user3",
        "image": "https://i8.amplience.net/i/liberty/000764365-R475298006-1?$medium$&qlt=90&fmt=auto&strip=true",
        "prix": "12.99",
        "titre": "Sunny Day"
    },
    {
        "categorie": "Parfum Enfant",
        "description": "Fragrance douce et florale pour petites filles",
        "id_user": "user3",
        "image": "https://cdn.shopify.com/s/files/1/0008/4285/8551/products/nafnaf-fairy-juice-pink-100ml-edt-l-sp_19ecec4e-cc68-4bb6-b4c5-ccaf04255aba_2000x.jpg?v=1560311071",
        "prix": "17.99",
        "titre": "Fairy Dream"
    },
    {
        "categorie": "Parfum Enfant",
        "description": "Parfum fruité et joyeux pour garçons et filles",
        "id_user": "user3",
        "image": "https://th.bing.com/th/id/OIP.bsYA1h2W8YJ4Kynq3TdOyAHaHa?rs=1&pid=ImgDetMain",
        "prix": "16.99",
        "titre": "Rainbow Breeze"
    },
    {
        "categorie": "Parfum Homme",
        "description": "Un parfum intense aux notes d'épices et de bois",
        "id_user": "user1",
        "image": "https://th.bing.com/th/id/OIP.pKqppian7VvKyfCC3G_xZQHaHa?rs=1&pid=ImgDetMain",
        "prix": "69.99",
        "titre": "Bois Mystique"
    },
    {
        "categorie": "Parfum Homme",
        "description": "Fragrance rafraîchissante, parfaite pour le sport",
        "id_user": "user1",
        "image": "https://pimages.parfumo.de/720/105184_img-9975-nova-sport_720.jpg",
        "prix": "44.99",
        "titre": "Sport Fresh"
    },
    {
        "categorie": "Parfum Femme",
        "description": "Un parfum floral léger avec des notes de jasmin",
        "id_user": "user2",
        "image": "https://th.bing.com/th/id/R.34bbcb7f3e7c4d239f540388534d90d1?rik=%2bf9rV%2bNpO%2bHN0A&pid=ImgRaw&r=0",
        "prix": "49.99",
        "titre": "Jasmin Serein"
    },
    {
        "categorie": "Parfum Femme",
        "description": "Parfum gourmand aux notes de chocolat et de café",
        "id_user": "user2",
        "image": "https://th.bing.com/th/id/OIP.kz2yrXBPatUV6rfZE8S1VAHaHa?w=154&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        "prix": "85.00",
        "titre": "Choco Café"
    }