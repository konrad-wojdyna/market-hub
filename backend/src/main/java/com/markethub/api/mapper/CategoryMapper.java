package com.markethub.api.mapper;

import com.markethub.api.dto.request.CreateCategoryRequest;
import com.markethub.api.dto.request.UpdateCategoryRequest;
import com.markethub.api.dto.response.CategoryResponse;
import com.markethub.api.entity.Category;

public class CategoryMapper {

    public static CategoryResponse toResponse(Category category){
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getSlug(),
                category.getIcon(),
                category.getDisplayOrder(),
                category.isActive(),
                category.getCreatedAt(),
                category.getUpdatedAt()
        );
    }

    public static Category toEntity(CreateCategoryRequest createCategoryRequest){
        return Category.builder()
                .name(createCategoryRequest.name())
                .slug(createCategoryRequest.slug())
                .icon(createCategoryRequest.icon())
                .displayOrder(createCategoryRequest.displayOrder())
                .active(createCategoryRequest.active())
                .build();
    }

    public static Category updateCategory(
            Category category,
            UpdateCategoryRequest request){

        category.setName(request.name());
        category.setSlug(request.slug());
        category.setIcon(request.icon());
        category.setDisplayOrder(request.displayOrder());
        category.setActive(request.active());

        return category;
    }

}
