'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { ProductCard } from './product-card';
import { Product } from '../types';
import { PackageOpen, Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductGridProps {
  initialProducts: Product[];
}

export function ProductGrid({ initialProducts }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters]);
  
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

    return filtered;
  }, [initialProducts, searchTerm, categoryFilter]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(initialProducts.map(p => p.category).filter(Boolean));
    return Array.from(cats);
  }, [initialProducts]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
  };

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      {/* Search and Filter Section */}
      <div className="space-y-3 sm:space-y-4">
        {/* Search Bar and Filter Dropdown - Right Aligned */}
        <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3 md:gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-auto sm:min-w-[280px] md:min-w-[320px] lg:min-w-[380px]">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search tools by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 sm:pl-12 pr-4 h-11 sm:h-12 text-sm sm:text-base bg-muted/30 border-border/60 rounded-lg focus:bg-background focus:border-primary transition-all placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative w-full sm:w-auto sm:min-w-[180px] md:min-w-[200px]" ref={dropdownRef}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="h-11 sm:h-12 px-3 sm:px-4 flex items-center justify-between gap-1.5 sm:gap-2 bg-background border border-border rounded-lg hover:border-primary transition-colors text-left whitespace-nowrap"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm font-medium hidden sm:inline">
                  {categoryFilter !== 'all' ? categoryFilter : 'All Tags'}
                </span>
              </div>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform flex-shrink-0 ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showFilters && (
              <div className="absolute top-full left-auto right-0 sm:left-0 sm:right-0 mt-2 bg-background border border-border rounded-lg shadow-xl z-50 animate-in slide-in-from-top-2 duration-200 min-w-[200px] sm:min-w-full">
                <div className="p-2 max-h-[60vh] sm:max-h-96 overflow-y-auto">
                  <button
                    onClick={() => { setCategoryFilter('all'); setShowFilters(false); }}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm rounded-md text-left transition-colors ${
                      categoryFilter === 'all' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    All Tags
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => { setCategoryFilter(category); setShowFilters(false); }}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm rounded-md text-left transition-colors ${
                        categoryFilter === category 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="w-full">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 md:py-24 px-4 text-center rounded-xl border border-dashed bg-muted/30">
            <div className="bg-muted rounded-full p-3 sm:p-4 mb-3 sm:mb-4">
              <PackageOpen className="h-6 sm:h-8 w-6 sm:w-8 text-muted-foreground" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-1">No products found</h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-sm mb-3 sm:mb-4">
              We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <Button onClick={clearAllFilters} variant="outline" size="sm">
              <X className="h-4 w-4 mr-2" />
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
