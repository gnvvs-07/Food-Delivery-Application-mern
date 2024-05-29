import { NavLink } from "react-router-dom"
import { assets } from "../../assets/assets"
import "./Sidebar.css"
export default function Sidebar() {
  return (
    <div className="sidebar">
        <div className="sidebar-options">
            <NavLink to="/add" className="sidebar-option">
                <img src={assets.add_icon} alt="+add-icons" />
                <p>Add items</p>
            </NavLink>
            <NavLink to="/list" className="sidebar-option">
                <img src={assets.order_icon} alt="order-icons" />
                <p>List Items</p>
            </NavLink>
            <NavLink to="/orders" className="sidebar-option">
                <img src={assets.order_icon} alt="order-icons" />
                <p>Add items</p>
            </NavLink>
        </div>
    </div>
  )
}
