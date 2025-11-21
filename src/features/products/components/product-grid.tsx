'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from './product-card';
import { Product } from '../types';
import { PackageOpen, Search, SlidersHorizontal, X, ArrowUpDown, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductGridProps {
  initialProducts: Product[];
}

export function ProductGrid({ initialProducts }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [billingFilter, setBillingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredProducts = useMemo(() => {
    let filtered = [...initialProducts];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        (p.short_description?.toLowerCase() || '').includes(searchLower) ||
        (p.category?.toLowerCase() || '').includes(searchLower)
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    // Apply billing filter
    if (billingFilter !== 'all') {
      filtered = filtered.filter(p => p.billing_interval === billingFilter);
    }

    // Apply sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [initialProducts, searchTerm, categoryFilter, billingFilter, sortBy]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(initialProducts.map(p => p.category).filter(Boolean));
    return Array.from(cats);
  }, [initialProducts]);

  const hasActiveFilters = searchTerm || categoryFilter !== 'all' || billingFilter !== 'all' || sortBy !== 'newest';

  const clearAllFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setBillingFilter('all');
    setSortBy('newest');
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="space-y-4">
        {/* Search Bar and Filter Button - Side by Side */}
        <div className="flex gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search products by name, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 h-12 text-base bg-background border-border/50 focus:border-primary transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Filter Button */}
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowFilters(!showFilters)}
            className={`h-12 px-6 gap-2 transition-all ${
              hasActiveFilters ? 'border-primary bg-primary/5' : ''
            }`}
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <Badge variant="default" className="ml-1 h-5 min-w-5 px-1.5 text-xs">
                {[categoryFilter !== 'all', billingFilter !== 'all', sortBy !== 'newest'].filter(Boolean).length}
              </Badge>
            )}
          </Button>
        </div>

        {/* Expandable Filter Panel */}
        {showFilters && (
          <Card className="p-4 sm:p-6 bg-card/50 backdrop-blur border-border/50 shadow-sm animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter Options
                </h3>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-8 px-3 text-xs"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Category</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Billing Interval Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Billing Type</label>
                  <select
                    value={billingFilter}
                    onChange={(e) => setBillingFilter(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  >
                    <option value="all">All Types</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="one-time">One-time</option>
                  </select>
                </div>

                {/* Sort By */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  >
                    <option value="newest">Newest First</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Results Count and Active Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> of{' '}
            <span className="font-semibold text-foreground">{initialProducts.length}</span> products
          </p>
          
          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 ml-auto">
              {searchTerm && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchTerm}
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {categoryFilter !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {categoryFilter}
                  <button
                    onClick={() => setCategoryFilter('all')}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {billingFilter !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {billingFilter}
                  <button
                    onClick={() => setBillingFilter('all')}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="w-full">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center rounded-xl border border-dashed bg-muted/30">
            <div className="bg-muted rounded-full p-4 mb-4">
              <PackageOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No products found</h3>
            <p className="text-muted-foreground max-w-sm mb-4">
              We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <Button onClick={clearAllFilters} variant="outline" size="sm">
              <X className="h-4 w-4 mr-2" />
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
