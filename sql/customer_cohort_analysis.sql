-- Customer Cohort Analysis (Monthly Retention Rate)
WITH CustomerFirstPurchase AS (
    SELECT 
        c.customer_unique_id,
        strftime('%Y-%m-01', MIN(o.order_purchase_timestamp)) AS cohort_month
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    WHERE o.order_status = 'delivered'
    GROUP BY 1
),
Activity AS (
    SELECT 
        c.customer_unique_id,
        cfp.cohort_month,
        strftime('%Y-%m-01', o.order_purchase_timestamp) AS activity_month,
        (
            (CAST(strftime('%Y', o.order_purchase_timestamp) AS INTEGER) - CAST(strftime('%Y', cfp.cohort_month) AS INTEGER)) * 12 +
            (CAST(strftime('%m', o.order_purchase_timestamp) AS INTEGER) - CAST(strftime('%m', cfp.cohort_month) AS INTEGER))
        ) AS cohort_index
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    JOIN CustomerFirstPurchase cfp ON c.customer_unique_id = cfp.customer_unique_id
    WHERE o.order_status = 'delivered'
)
SELECT 
    cohort_month,
    COUNT(DISTINCT customer_unique_id) AS cohort_size,
    COUNT(DISTINCT CASE WHEN cohort_index = 1 THEN customer_unique_id END) AS month_1_retained,
    COUNT(DISTINCT CASE WHEN cohort_index = 2 THEN customer_unique_id END) AS month_2_retained,
    COUNT(DISTINCT CASE WHEN cohort_index = 3 THEN customer_unique_id END) AS month_3_retained,
    COUNT(DISTINCT CASE WHEN cohort_index = 6 THEN customer_unique_id END) AS month_6_retained,
    COUNT(DISTINCT CASE WHEN cohort_index = 12 THEN customer_unique_id END) AS month_12_retained
FROM Activity
GROUP BY 1
ORDER BY 1;
