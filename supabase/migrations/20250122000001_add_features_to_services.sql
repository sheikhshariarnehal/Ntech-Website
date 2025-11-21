-- Add features column to services table
-- Migration created: 2025-01-22

-- Add the features column
ALTER TABLE services ADD COLUMN IF NOT EXISTS features TEXT[];

-- Add comment to the column
COMMENT ON COLUMN services.features IS 'List of key features for the service';

-- Update existing services with default features based on their slug
UPDATE services 
SET features = ARRAY[
  'Custom Web Apps',
  'Mobile Development',
  'SaaS Platforms',
  'API Integration'
]
WHERE slug = 'web-development' AND features IS NULL;

UPDATE services 
SET features = ARRAY[
  'Custom Chatbots',
  'Workflow Automation',
  'Data Analysis',
  'AI Integration'
]
WHERE slug = 'ai-automation' AND features IS NULL;

UPDATE services 
SET features = ARRAY[
  'Instant Delivery',
  '24/7 Support',
  'Competitive Pricing',
  'Secure Payment'
]
WHERE slug = 'premium-subscriptions' AND features IS NULL;

-- Add default features for any services without features
UPDATE services 
SET features = ARRAY[
  'Professional Quality',
  'Expert Support',
  'Scalable Solutions',
  'Best Practices'
]
WHERE features IS NULL;
