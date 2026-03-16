package com.markethub.api.service;


import com.markethub.api.dto.request.CreateCategoryRequest;
import com.markethub.api.dto.request.UpdateCategoryRequest;
import com.markethub.api.dto.response.CategoryResponse;
import com.markethub.api.entity.Category;
import com.markethub.api.exception.CategoryNotFound;
import com.markethub.api.exception.SlugAlreadyExistsException;
import com.markethub.api.mapper.CategoryMapper;
import com.markethub.api.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<CategoryResponse> findAll(){
        return categoryRepository.findAll().stream().map(CategoryMapper::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public CategoryResponse findById(Long id){
        Category category = findCategoryById(id);
        return CategoryMapper.toResponse(category);
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> getActive(){

        return categoryRepository.findAllByActiveTrueOrderByDisplayOrderAsc()
                .stream().map(CategoryMapper::toResponse).toList();
    }

    @Transactional
    public CategoryResponse createCategory(CreateCategoryRequest createCategoryRequest){

        if(categoryRepository.existsBySlug(createCategoryRequest.slug())){
            throw  new SlugAlreadyExistsException(createCategoryRequest.slug());
        }

        Category category = CategoryMapper.toEntity(createCategoryRequest);
        Category newCategory = categoryRepository.save(category);

        return CategoryMapper.toResponse(newCategory);
    }

    @Transactional
    public CategoryResponse editCategory(Long categoryId, UpdateCategoryRequest request){
        Category category = findCategoryById(categoryId);

        if(categoryRepository.existsBySlugAndIdNot(request.slug(), categoryId)){
            throw new SlugAlreadyExistsException(request.slug());
        }

        Category updatedCategory = CategoryMapper.updateCategory(category, request);
        Category savedCategory = categoryRepository.save(updatedCategory);

        return CategoryMapper.toResponse(savedCategory);
    }

    @Transactional
    public void deleteCategory(Long categoryId){
        categoryRepository.deleteById(categoryId);
    }

    @Transactional
    public CategoryResponse changeCategoryStatus(Long categoryId){
         Category category = findCategoryById(categoryId);

         category.setActive(!category.isActive());
         Category editedCategory = categoryRepository.save(category);

         return CategoryMapper.toResponse(editedCategory);
    }

    private Category findCategoryById(Long categoryId){
        return categoryRepository.findById(categoryId).orElseThrow(() ->
                new CategoryNotFound(categoryId));
    }
}
