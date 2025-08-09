import React from "react";
import "./NewCollections.css";
import new_collection from "../../assets/data/newcollection";
import Item from "../Item/Item";

const NewCollections = () => {
  console.log("New Collection Data:", new_collection); // Debug log

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection && new_collection.map((item, i) => {
          console.log("Rendering item:", item); // Debug log
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections; 