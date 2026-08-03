"use client";

import { useState, useEffect } from "react";

import Header from "./Header";
import CategoriesTable from "./CategoriesTable";
import CategoryModal from "./CategoryModal";
import SubCategoryModal from "./SubCategoryModal";

export default function Categories() {

    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSub, setSelectedSubCategory] = useState(null);
const [showSubModal, setShowSubModal] = useState(false);

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {

        const res = await fetch("/admin/api/categories");
        const data = await res.json();

        setCategories(data);

    }

    function createCategory() {

        setSelectedCategory({

            name: "",

            status: true,

        });

        setShowModal(true);

    }
    function createSubCategory() {

    setSelectedSubCategory({

        name: "",

        categoryId: categories[0]?.id,

        status: true,

    });

    setShowSubModal(true);

}

    function editCategory(category) {

        setSelectedCategory(category);

        setShowModal(true);

    }

    async function deleteCategory(id){

    if(!confirm("Delete category?")) return;

    await fetch(`/admin/api/categories/${id}`,{
        method:"DELETE"
    });

    setCategories(prev=>prev.filter(c=>c.id!==id));

}
    function editSubCategory(sub){

    setSelectedSubCategory(sub);

    setShowSubModal(true);

}

async function deleteSubCategory(id){

    if(!confirm("Delete subcategory?")) return;

    await fetch(`/admin/api/subcategories/${id}`,{

        method:"DELETE"

    });

    loadCategories();

}
    async function saveCategory(category){

    if(category.id){

        const res=await fetch(`/admin/api/categories/${category.id}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(category)

        });

        const updated=await res.json();

        setCategories(prev=>

            prev.map(c=>

                c.id===updated.id

                ?{
                    ...updated,
                    subCategories:category.subCategories
                }

                :c

            )

        );

    }

    else{

        const res=await fetch("/admin/api/categories",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(category)

        });

        const created=await res.json();

        setCategories(prev=>[

            ...prev,

            {
                ...created,
                subCategories:[]
            }

        ]);

    }

    setShowModal(false);

}
async function saveSubCategory(sub){

    if(sub.id){

        await fetch(`/admin/api/subcategories/${sub.id}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(sub)

        });

    }

    else{

        await fetch("/admin/api/subcategories",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(sub)

        });

    }

    await loadCategories();

    setShowSubModal(false);

}
    return (

        <>

            <Header createCategory={createCategory} createSubCategory={createSubCategory} />

            <CategoriesTable

                categories={categories}

                editCategory={editCategory}

                deleteCategory={deleteCategory}
                editSubCategory={editSubCategory}
    deleteSubCategory={deleteSubCategory}

            />

            {showModal && (

                <CategoryModal

                    category={selectedCategory}

                    onClose={() => setShowModal(false)}

                    onSave={saveCategory}

                />

            )}
            {showSubModal && (

    <SubCategoryModal

        subCategory={selectedSub}

        categories={categories}

        onClose={()=>setShowSubModal(false)}

        onSave={saveSubCategory}

    />

)}

        </>

    );

}