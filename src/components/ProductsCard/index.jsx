import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, sendSelectedProducts } from "../../redux/slices/productSlice.js";
import css from "./ProductsCard.module.css";
import loader from '../../assets/loader.gif';
import logo from '../../assets/logo.png';

// currently assuming number of pages is 9
const maxPageCount = 9;

const ProductsCard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    const [selected, setSelected] = useState([]);
    const [selectedImage, setSelectedImage] = useState([]);
    const [pageCount, setPageCount] = useState(1);

    const fetchProducts = useCallback(() => {
        dispatch(getAllProducts(pageCount));
    }, [dispatch, pageCount]);

    useEffect(() => {
        fetchProducts();
        return() => {
            setSelected([]);
            setSelectedImage([]);
        }
    }, [fetchProducts, pageCount]);

    const handleSelect = (image) => {
        const isSelected = selected.includes(image?.id);

        // If selected, remove it from the array; otherwise, add it
        if (isSelected) {
            setSelected(selected.filter((id) => id !== image?.id));
            setSelectedImage(
                selectedImage.filter((img) => img?.id !== image?.id)
            );
        } else {
            if (selected.length < 10) {
                setSelected([...selected, image?.id]);
                setSelectedImage([...selectedImage, image]);
            } else {
                alert("You can only select up to 10 products.");
            }
        }
    };

    const handleImageError = (event) => {
        event.target.src =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY4lxLBQN9NF8btPTL7xVXqMUekVe2UhbjP9oXcR4HRYBjXPY9bo6WgRLcRzamVVpKNkg&usqp=CAU";
    };

    const handleNext = () => {
        if (pageCount === maxPageCount) return;
        setPageCount((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (pageCount === 1) return;
        setPageCount((prev) => prev - 1);
    };

    const nextButtonHandler = () => {
        handleNext();
        if (selectedImage.length > 0) {
            // data sent here to api to save at backend
            dispatch(sendSelectedProducts(selected));

            const selectedImageNames = selectedImage.map((image) => {
                return image.name || image.author.split(' ')[0];
            });

            const message = `You have successfully saved ${selectedImageNames.join(", ")}`;
            alert(message);
        }
    };

    return (
        <div className={css.cardWrapper}>
            <div className={css.parent}>
                <div className={css.imageBox}>
                    <img
                        src="https://s3-alpha-sig.figma.com/img/2c4e/6859/02df4b6fa5a5719dc3c86c2c7b184fe8?Expires=1704067200&Signature=OQ9Ba6SFoyzKAvSBlWHUqH72X4yUCbOe822pcU0OuptPmMm2us6O9cGGq7246JKqNK0rbWMLuXAC2YeyOSSaD1DEVPatvRs6IOqu4r1HVwPKsEXyTsHp69uillN9Blf36bl5wMySORU~tR14JApuF0qI-0Ieqh2iUAQr2OaS4by5SFS-JX~VA6twLKyjjdp3v5udEWDSs80IAptoILaoVGX6UZtw1uP6-No2BpNSzvobRNBfornIpl8RwOfDRiCU9H7V9B4N6hkV0OF8bk7sTl07E4lmRHt3SJjFa8kTKdrEbM8A-H9~~9hodNUDCJqN2mbiICfsVspjqkcJKEVTUQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        alt=""
                    />
                </div>
                <div className={css.contentBox}>
                    <div className={css.contentHeader}>
                        <div className={css.logoBox}>
                            <img src={logo} alt="" />
                        </div>
                        <div className={css.headerTextWrap}>
                            <div>
                                <h4>Pick you favourite Products</h4>
                                <p>Select upto 10 out of 100</p>
                            </div>
                            <p onClick={handleNext} className={css.skipButton}>
                                Skip
                            </p>
                        </div>
                    </div>

                    <div className={css.productsBox}>
                        {products ?
                            products.map((prod) => (
                                <div
                                    key={prod?.id}
                                    className={css.productWrap}
                                >
                                    <div
                                        onClick={() => handleSelect(prod)}
                                        className={`${css.productImage} ${
                                            selected.includes(prod?.id) &&
                                            css.selected
                                        }`}
                                    >
                                        <img
                                            src={prod?.image || prod?.download_url}
                                            onError={handleImageError}
                                            alt="Preview unavailable"
                                        />
                                        {selected.includes(prod?.id) && (
                                            <div className={css.checkBox}>
                                                <i className="ri-checkbox-fill"></i>
                                            </div>
                                        )}
                                    </div>
                                    <p>{prod?.name || prod?.author.split(' ')[0]}</p>
                                </div>
                            ))
                            : <img className={css.loader} src={loader} alt="" />
                        }
                    </div>

                    <div className={css.bottomBox}>
                        <div className={css.showPageCount}>
                            <i className="ri-arrow-left-s-line"></i>
                            <p>{pageCount}/{maxPageCount}</p>
                            <i className="ri-arrow-right-s-line"></i>
                        </div>
                        <div className={css.buttonWrap}>
                            <div
                                onClick={handlePrev}
                                className={`${css.button} ${css.prevButton}`}
                            >
                                <i className="ri-arrow-left-s-line"></i>
                                <p>Previous</p>
                            </div>
                            <div
                                onClick={nextButtonHandler}
                                className={`${css.button} ${css.nextButton}`}
                            >
                                <p>Next</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;
