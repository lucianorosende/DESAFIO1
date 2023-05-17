import { socket } from "./main";
import React from "react";

// interface IProduct {
//     title: string;
//     description: string;
//     price: number;
//     thumbnails: string[];
//     code: string;
//     stock: number;
//     status: boolean;
//     category: string;
//     quantity: number;
//     id?: number;
// }

const App: React.FC = () => {
    socket.emit("deploy", "deploy");

    // socket.on("tableProducts", (d) => setData(d));

    return (
        <>
            <div className="form-container">
                <h2>Add your Product</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Title</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Description</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Price</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Thumbnail</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Code</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Stock</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Category</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
            <div className="App">
                <h1>View Products</h1>
                <hr />
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Thumbnails</th>
                            <th>Code</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {data.map((item) => {
                            return (
                                <tr>
                                    <th>{item.title}</th>
                                    <th>{item.description}</th>
                                    <th>{item.price}</th>
                                    <th>{item.thumbnails}</th>
                                    <th>{item.code}</th>
                                    <th>{item.stock}</th>
                                    <th>{item.category}</th>
                                    <th>{item.id}</th>
                                    <th>
                                        <button>X</button>
                                    </th>
                                </tr>
                            );
                        })} */}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default App;
