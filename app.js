const fs = require('fs')

class ProductManager {
    // constructor
    constructor(filePath){
        this.path = filePath
        this.initializeFile()
        this.nextId = this.getNextID()// acomoda los id segun los productos que tenemos

    }

    // iniciarlizacion del archivo
    initializeFile(){
        if(!fs.existsSync(this.path)){
            fs.writeFileSync(this.path, JSON.stringify([]))
        }
    }

    // funcion para incrementar el id
    getNextID(){
        const products = this.getProductsFromFile()
        if(products.lenght === 0){
            return 1
        }

        const maxID = products.reduce((max, product)=> (product.id > max ? product.id : max),0)
        return maxID +1
    }

    // metodo para agregar productos
    addProduct(product){
        const products = this.getProductsFromFile()
        product.id = this.nextId
        this.nextId+=1

        products.push(product)
        this.saveProductsToFile(products)
    }

    // metodo para mostrar productos
    getProducts(){
        return this.getProductsFromFile()
    }

    //metodo para mostrar productos por id
    getProduct(id){
        const products = this.getProductsFromFile()
        return products.find(e => e.id === id)
    }

    // metodo para actualizar o cambiar productos
    updateProduct(id,updateFields){
        const products = this.getProductsFromFile()
        const index = products.findIndex( p => p.id === id)
        if(index !== -1){
            products[index] = { ...products[index],updateFields}
            this.saveProductsToFile(products)
        }
    }

    // metodo para eliminar productos por id
    deleteProduct(id){
        const products = this.getProductsFromFile()
        products.filter(p => p.id === id )
        this.saveProductsToFile(products)
    }


    // metodo para leer el archivo y devuelva todos los productos

    getProductsFromFile(){
        const data = fs.readFileSync(this.path, "utf-8")
        return JSON.parse(data)
    }

    //metodo para guardar productos en un archivo 
    saveProductsToFile(products){
        fs.writeFileSync(this.path, JSON.stringify(products,null ,2))

    }

}

const manager = new ProductManager('products.json')

//añadir producto
manager.addProduct({
    title: "Producto A",
    description: "Excelente unidad a la venta",
    price: 200,
    thumbnail: 'ruta',
    codigo: "ABC111",
    stock: 4000
})

// obtener los productos totales

const todosproductos = manager.getProducts()

console.log(todosproductos)