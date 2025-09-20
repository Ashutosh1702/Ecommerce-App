import p1_img from '../images/p1.jfif'
import p2_img from '../images/p2.jfif'
import p3_avif from '../images/p3.avif'
import p4_jfif from '../images/p4.jfif'

let data_product= [
     {
            id: 101,
            name: "Kurti",
            category: "women",
            image: p1_img,
            new_price: 50.0,
            old_price: 80.5
    },
    
        { 
            id: 102, 
            name: "One-Piece Dress", 
            category: "women",
            image:p2_img,
            new_price: 60.0,
            old_price: 90.5
        },
        { 
            id: 103,
            name: "Salwar Suit", 
            category: "women", 
            image:p3_avif,
            new_price: 75.0,
            old_price: 120.0
        },
        { 
            id: 104, 
            name: "Jacket", 
            category: "women", 
            image: p4_jfif, 
            new_price: 90.0, 
            old_price: 140.0 
        }
]

export default data_product;