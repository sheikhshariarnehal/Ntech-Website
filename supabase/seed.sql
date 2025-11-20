-- =====================================================
-- SEED DATA FOR NTECH SAAS PLATFORM
-- =====================================================

-- =====================================================
-- 1. SEED SERVICES
-- =====================================================
INSERT INTO public.services (slug, name, short_description, long_description, icon, starting_price, is_active, seo_title, seo_description)
VALUES
  (
    'web-development',
    'Web Development',
    'Custom web applications built with modern technologies',
    'We build fast, scalable, and secure web applications using Next.js, React, Node.js, and more. Our team specializes in creating responsive, user-friendly interfaces backed by robust server-side logic.',
    'code',
    2500.00,
    true,
    'Professional Web Development Services',
    'Expert web development services using Next.js, React, and modern technologies'
  ),
  (
    'mobile-app-development',
    'Mobile App Development',
    'Native and cross-platform mobile applications',
    'Create stunning mobile experiences for iOS and Android. We use React Native and Flutter to build high-performance apps that work seamlessly across platforms.',
    'smartphone',
    3500.00,
    true,
    'Mobile App Development Services',
    'Professional iOS and Android app development using React Native and Flutter'
  ),
  (
    'ai-integration',
    'AI Integration',
    'Integrate AI and machine learning into your products',
    'Leverage the power of AI with ChatGPT, Claude, and custom ML models. We help you integrate intelligent features like chatbots, content generation, image recognition, and more.',
    'brain',
    1500.00,
    true,
    'AI Integration Services',
    'Integrate ChatGPT, Claude, and ML models into your applications'
  ),
  (
    'cloud-infrastructure',
    'Cloud Infrastructure',
    'Scalable cloud solutions on AWS, Azure, and GCP',
    'Design and deploy robust cloud infrastructure. We handle everything from architecture design to DevOps, ensuring your applications are secure, scalable, and cost-effective.',
    'cloud',
    2000.00,
    true,
    'Cloud Infrastructure Services',
    'Professional cloud infrastructure setup on AWS, Azure, and Google Cloud'
  ),
  (
    'ui-ux-design',
    'UI/UX Design',
    'Beautiful, intuitive user interfaces',
    'Create delightful user experiences with our design team. From wireframes to high-fidelity prototypes, we ensure your product is both beautiful and functional.',
    'palette',
    1200.00,
    true,
    'UI/UX Design Services',
    'Professional UI/UX design for web and mobile applications'
  );

-- =====================================================
-- 2. SEED PRODUCTS (Digital Products)
-- =====================================================
INSERT INTO public.products (slug, name, short_description, long_description, price, billing_interval, stock, is_active, thumbnail_url, seo_title, seo_description)
VALUES
  (
    'chatgpt-pro-subscription',
    'ChatGPT Pro Subscription',
    'Access to ChatGPT Pro with advanced features',
    'Get full access to ChatGPT Pro with GPT-4, unlimited messages, faster response times, and priority access to new features.',
    20.00,
    'monthly',
    0,
    true,
    '/products/chatgpt-pro.jpg',
    'ChatGPT Pro Monthly Subscription',
    'ChatGPT Pro subscription with GPT-4 access and unlimited messages'
  ),
  (
    'gemini-pro-subscription',
    'Gemini Pro Subscription',
    'Google Gemini Pro AI assistant',
    'Access Google''s most advanced AI model with multimodal capabilities, including text, images, and code generation.',
    18.00,
    'monthly',
    0,
    true,
    '/products/gemini-pro.jpg',
    'Google Gemini Pro Subscription',
    'Gemini Pro subscription with advanced AI capabilities'
  ),
  (
    'canva-pro-subscription',
    'Canva Pro Subscription',
    'Professional design tools and templates',
    'Unlock premium Canva features including access to millions of premium templates, photos, and graphics. Includes brand kit, background remover, and team collaboration features.',
    12.99,
    'monthly',
    0,
    true,
    '/products/canva-pro.jpg',
    'Canva Pro Monthly Subscription',
    'Canva Pro with premium templates and design tools'
  ),
  (
    'github-copilot-subscription',
    'GitHub Copilot Subscription',
    'AI pair programmer for developers',
    'GitHub Copilot uses AI to suggest code and entire functions in real-time. Works with all major IDEs and supports dozens of programming languages.',
    10.00,
    'monthly',
    0,
    true,
    '/products/github-copilot.jpg',
    'GitHub Copilot Subscription',
    'AI-powered code completion with GitHub Copilot'
  ),
  (
    'claude-pro-subscription',
    'Claude Pro Subscription',
    'Anthropic Claude Pro AI assistant',
    'Claude Pro offers extended conversations, priority access, and early access to new features. Perfect for research, writing, and complex problem-solving.',
    20.00,
    'monthly',
    0,
    true,
    '/products/claude-pro.jpg',
    'Claude Pro Subscription',
    'Claude Pro AI assistant by Anthropic'
  );

-- =====================================================
-- 3. SEED PRODUCT METADATA
-- =====================================================
INSERT INTO public.product_metadata (product_id, key, value)
SELECT id, 'delivery_type', 'account_credentials'
FROM public.products
WHERE slug = 'chatgpt-pro-subscription';

INSERT INTO public.product_metadata (product_id, key, value)
SELECT id, 'delivery_time', 'Within 24 hours'
FROM public.products
WHERE slug IN ('chatgpt-pro-subscription', 'gemini-pro-subscription', 'claude-pro-subscription');

INSERT INTO public.product_metadata (product_id, key, value)
SELECT id, 'support_included', 'true'
FROM public.products;

-- =====================================================
-- 4. SEED PROJECTS (Portfolio)
-- =====================================================
INSERT INTO public.projects (slug, title, client_name, short_description, full_description, services_used, thumbnail_url, live_url, is_featured, published_at)
VALUES
  (
    'ecommerce-platform',
    'Modern E-Commerce Platform',
    'ShopTech Inc.',
    'Full-featured e-commerce platform with AI recommendations',
    'Built a complete e-commerce solution with real-time inventory management, AI-powered product recommendations, and integrated payment processing. The platform handles 10,000+ daily transactions with 99.9% uptime.',
    ARRAY['web-development', 'ai-integration', 'cloud-infrastructure'],
    '/projects/ecommerce.jpg',
    'https://shoptech-demo.example.com',
    true,
    now() - interval '30 days'
  ),
  (
    'healthcare-mobile-app',
    'Healthcare Patient Portal',
    'MediCare Solutions',
    'HIPAA-compliant mobile app for patient management',
    'Developed a secure mobile application for patient-doctor communication, appointment scheduling, and medical record access. Features include video consultations, prescription management, and real-time health monitoring.',
    ARRAY['mobile-app-development', 'cloud-infrastructure'],
    '/projects/healthcare.jpg',
    null,
    true,
    now() - interval '60 days'
  ),
  (
    'ai-content-platform',
    'AI Content Generation Platform',
    'ContentPro',
    'SaaS platform for AI-powered content creation',
    'Created a comprehensive content creation platform leveraging multiple AI models. Features include blog post generation, social media content, image creation, and SEO optimization. Serves 5,000+ active users.',
    ARRAY['web-development', 'ai-integration', 'ui-ux-design'],
    '/projects/ai-content.jpg',
    'https://contentpro-demo.example.com',
    true,
    now() - interval '90 days'
  );

-- =====================================================
-- 5. SEED BLOG POSTS
-- =====================================================
-- Note: These will reference author_id which needs to be set after admin user is created
-- For now, we'll leave author_id as NULL

INSERT INTO public.posts (slug, title, excerpt, content, tags, is_published, published_at, seo_title, seo_description)
VALUES
  (
    'future-of-ai-in-web-development',
    'The Future of AI in Web Development',
    'Explore how artificial intelligence is transforming the way we build web applications',
    '# The Future of AI in Web Development

Artificial Intelligence is revolutionizing web development in unprecedented ways. From intelligent code completion to automated testing and deployment, AI tools are making developers more productive than ever.

## Key Trends

1. **AI-Powered Code Generation**: Tools like GitHub Copilot and ChatGPT are helping developers write code faster
2. **Automated Testing**: AI can generate comprehensive test suites automatically
3. **Intelligent UI/UX**: AI helps create personalized user experiences

## Conclusion

The integration of AI in web development is not just a trend—it''s the future. Companies that embrace these technologies early will have a significant competitive advantage.',
    ARRAY['AI', 'Web Development', 'Technology'],
    true,
    now() - interval '10 days',
    'The Future of AI in Web Development - Ntech Blog',
    'Discover how AI is transforming web development with automated coding, testing, and intelligent design'
  ),
  (
    'why-nextjs-for-your-next-project',
    'Why Choose Next.js for Your Next Project',
    'Next.js has become the go-to framework for modern web applications. Here''s why.',
    '# Why Choose Next.js for Your Next Project

Next.js has emerged as one of the most popular React frameworks, and for good reason. It offers an excellent developer experience while providing powerful features out of the box.

## Key Benefits

- **Server-Side Rendering**: Better SEO and faster initial page loads
- **Static Site Generation**: Blazing fast performance for content-heavy sites
- **API Routes**: Build your backend and frontend in one codebase
- **Automatic Code Splitting**: Optimized bundle sizes for better performance

## Real-World Use Cases

Companies like Netflix, Twitch, and TikTok use Next.js for their web applications. It''s production-ready and scales to millions of users.',
    ARRAY['Next.js', 'React', 'Web Development'],
    true,
    now() - interval '20 days',
    'Why Choose Next.js for Your Next Project - Ntech',
    'Learn why Next.js is the best choice for modern web applications'
  ),
  (
    'building-scalable-cloud-infrastructure',
    'Building Scalable Cloud Infrastructure',
    'Best practices for designing cloud infrastructure that grows with your business',
    '# Building Scalable Cloud Infrastructure

Scalability is crucial for modern applications. Learn how to design cloud infrastructure that can handle growth from day one.

## Architecture Principles

1. **Microservices**: Break down your application into smaller, independent services
2. **Load Balancing**: Distribute traffic across multiple servers
3. **Auto-scaling**: Automatically adjust resources based on demand
4. **Database Optimization**: Use caching and read replicas

## Cloud Providers

We recommend AWS, Azure, or Google Cloud Platform depending on your specific needs. Each has its strengths and optimal use cases.',
    ARRAY['Cloud', 'DevOps', 'Infrastructure'],
    true,
    now() - interval '30 days',
    'Building Scalable Cloud Infrastructure - Best Practices',
    'Learn best practices for building scalable cloud infrastructure on AWS, Azure, and GCP'
  );

-- =====================================================
-- SEED DATA COMPLETE
-- =====================================================
