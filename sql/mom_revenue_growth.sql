-- Monthly Revenue & Month-over-Month (MoM) Growth Rate
WITH MonthlyRevenue AS (
    SELECT 
        strftime('%Y-%m', o.order_purchase_timestamp) AS order_month,
        SUM(p.payment_value) AS total_revenue
    FROM orders o
    JOIN order_payments p ON o.order_id = p.order_id
    WHERE o.order_status = 'delivered'
    GROUP BY 1
),
RevenueWithLag AS (
    SELECT 
        order_month,
        total_revenue,
        LAG(total_revenue, 1) OVER (ORDER BY order_month) AS previous_month_revenue
    FROM MonthlyRevenue
)
SELECT 
    order_month,
    ROUND(total_revenue, 2) AS current_month_revenue,
    ROUND(previous_month_revenue, 2) AS last_month_revenue,
    ROUND(
        ((total_revenue - previous_month_revenue) / previous_month_revenue * 100), 
        2
    ) AS mom_growth_percentage
FROM RevenueWithLag
ORDER BY order_month;
