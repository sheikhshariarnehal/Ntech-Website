'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  SlidersHorizontal, 
  X,
  Filter
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PRODUCT_CATEGORIES, BILLING_INTERVALS, ProductFilters as ProductFiltersType } from '../types';

interface ProductFiltersProps {
  onFilterChange: (filters: ProductFiltersType) => void;
  currentFilters: ProductFiltersType;
}

export function ProductFilters({ onFilterChange, currentFilters }: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || '');
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onFilterChange({ ...currentFilters, search: value || undefined });
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({ 
      ...currentFilters, 
      category: category === 'All' ? undefined : category 
    });
  };

  const handleBillingChange = (interval: string) => {
    onFilterChange({ 
      ...currentFilters, 
      billing_interval: interval === 'all' ? undefined : interval 
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    onFilterChange({});
  };

  const activeFilterCount = [
    currentFilters.category,
    currentFilters.billing_interval,
    currentFilters.search,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Mobile Search Bar */}
      <div className="xl:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-4 h-12"
          />
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="flex items-center justify-between xl:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 rounded-full px-2 py-0.5">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filter Products</SheetTitle>
              <SheetDescription>
                Refine your product search
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <FilterContent
                currentFilters={currentFilters}
                onCategoryChange={handleCategoryChange}
                onBillingChange={handleBillingChange}
              />
            </div>
          </SheetContent>
        </Sheet>

        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
            <X className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Desktop Filters */}
      <div className="hidden xl:block">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </h3>
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2 h-8">
                <X className="h-3 w-3" />
                Clear All
              </Button>
            )}
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 h-12"
            />
          </div>
          
          <FilterContent
            currentFilters={currentFilters}
            onCategoryChange={handleCategoryChange}
            onBillingChange={handleBillingChange}
          />
        </div>
      </div>
    </div>
  );
}

function FilterContent({
  currentFilters,
  onCategoryChange,
  onBillingChange,
}: {
  currentFilters: ProductFiltersType;
  onCategoryChange: (category: string) => void;
  onBillingChange: (interval: string) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Categories
        </h4>
        <div className="flex flex-wrap gap-2">
          {PRODUCT_CATEGORIES.map((category) => (
            <Badge
              key={category}
              variant={
                (currentFilters.category || 'All') === category
                  ? 'default'
                  : 'outline'
              }
              className="cursor-pointer transition-all hover:scale-105"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Billing Type */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Billing Type
        </h4>
        <div className="space-y-2">
          {BILLING_INTERVALS.map((interval) => (
            <button
              key={interval.value}
              onClick={() => onBillingChange(interval.value)}
              className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                (currentFilters.billing_interval || 'all') === interval.value
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'bg-muted/50 hover:bg-muted'
              }`}
            >
              {interval.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
