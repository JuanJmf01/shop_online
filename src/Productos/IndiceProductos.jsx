import { useState, useEffect } from "react"
import ListadoDeProductos from "./ListadoDeProductos"
import ProductoIndividual from "./ProductoIndividual"

export default function IndiceProductos() {

    const [productos, setProductos] = useState({})

    useEffect(() => {
        const timerId = setTimeout(() => {
            setProductos({
                productoPrueba: [
                    {
                        id: 1,
                        titulo: 'Redbull',
                        imagen: "https://m.media-amazon.com/images/I/61xF-XCi97L._SL1500_.jpg",
                        precio: 3200

                    },
                    {
                        id: 2,
                        titulo: 'Vive100',
                        imagen: "https://m.media-amazon.com/images/I/61xF-XCi97L._SL1500_.jpg",
                        precio: 3200

                    }
                ],
                productosOferta: [
                    {
                        id: 3,
                        titulo: 'Monster',
                        imagen: "https://m.media-amazon.com/images/I/61xF-XCi97L._SL1500_.jpg",
                        precio: 2900
                    }
                ]
            })
        }, 1000)

        return () => clearTimeout(timerId)
    })

    return (
        <>
            <h3>Productos</h3>
            <ListadoDeProductos productos={productos.productoPrueba} />

            <h3>Oferta</h3>
            <ListadoDeProductos productos={productos.productosOferta} />
        </>
    )
}