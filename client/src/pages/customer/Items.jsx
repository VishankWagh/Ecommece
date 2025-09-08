import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import Card from '../../components/Card';
import { useNavigate } from 'react-router';
import { IndianRupee, MapPinHouse, Search, User } from 'lucide-react';

const Items = ({ auth }) => {
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState("All");
    const [price, setPrice] = useState(0);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCategory();
        fetchItems();
    }, []);

    const fetchCategory = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/items/categories`);

            if (res.data.success) {
                setCategories(res.data.categories);
            } else {
                toast.error("Unable to fetch categories");
            }

        } catch (error) {
            console.log("Error fetching Categories:", error);
            toast.error("Failed to load Categories");
        }
    }

    const fetchItems = async () => {
        try {
            setLoading(true);

            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/items/${category}/${price || 'All'}`);

            if (res.data.success) {
                setItems(res.data.items);
            } else {
                toast.error("Unable to fetch items");
            }

        } catch (error) {
            console.log("Error fetching Items:", error);
            toast.error("Failed to load Items");
        } finally {
            setLoading(false);
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        fetchItems();
    }

    const addToCart = async (itemId, quantity) => {
        try {
            setLoading(true);
            console.log(itemId, quantity);

            if (!auth) {
                toast.success("Please login first");
                return navigate("/items/items-list");
                // return
            }

            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/cart/`, {
                item: itemId,
                quantity,
                customerId: auth.id
            });
            console.log("adt res", res);

            if (res.data.success) {

                toast.success("item added to cart");
                navigate("/items/cart");
            } else {
                toast.error("Unable to add to cart");
            }

        } catch (error) {
            console.log("Error adding to cart:", error);
            toast.error("Failed to add to cart");
        } finally {
            setLoading(false);
        }
    }

    console.log(items, categories, category, price);


    return (
        <div className='min-h-screen'>
            {loading
                ? <div className="text-center text-primary py-10">Loading items...</div>
                : <div className="dashboard ">
                    <h3 className="page-heading">Search Items</h3>
                    <form action="" className="form flex gap-3" onSubmit={handleSearch}>
                        <label className="input input-bordered flex items-center gap-2 b-rad">
                            Category
                            <select className="select select-primary w-full max-w-xs b-rad border-gray-300" onChange={(e) => setCategory(e.target.value)}>
                                <option selected value={"All"}>Select Category</option>
                                {categories.map((catg, id) => <option key={id} value={catg._id} selected={category == catg._id}>{catg.name}</option>)}
                            </select>
                        </label>
                        <label className="input input-bordered flex items-center gap-2 b-rad">
                            <IndianRupee /> Price
                            <input type="number" className="grow" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </label>
                        <button className="btn btn-success b-rad bg-slate-300" type="submit"><Search /> Search</button>
                    </form>

                    <div className="container my-10 rounded-lg">
                        <div className="text-1xl py-2 mb-2">Your Results</div>
                        <div className="stores-list flex flex-wrap items-center gap-7">
                            {items.length > 0 && items.map((item, idx) => {
                                return <Card key={idx} id={item._id} name={item.name} price={item.price} description={item.description} category={item.category?.name} image={item.image} addToCart={addToCart} />
                            })}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Items