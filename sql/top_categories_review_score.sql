-- Top 10 Product Categories by Sales with Review Scores
SELECT 
    t.product_category_name_english AS product_category,
    COUNT(DISTINCT oi.order_id) AS total_orders,
    ROUND(SUM(oi.price), 2) AS total_sales,
    ROUND(AVG(r.review_score), 2) AS avg_review_score,
    -- Calculate percentage of negative reviews (score 1 or 2)
    ROUND(
        (COUNT(CASE WHEN r.review_score <= 2 THEN 1 END) * 100.0 / COUNT(r.review_id)), 
        2
    ) AS negative_review_percentage
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
LEFT JOIN product_category_name_translation t ON p.product_category_name = t.product_category_name
JOIN order_reviews r ON oi.order_id = r.order_id
GROUP BY 1
HAVING COUNT(DISTINCT oi.order_id) >= 100
ORDER BY total_sales DESC
LIMIT 10;
