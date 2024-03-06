import { Injectable } from '@angular/core';
import { Project } from './types';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  saveObjectToLocalStorage(value: Project): void {
    try {
      if (localStorage.getItem(value.id)) {
        localStorage.setItem(value.id, JSON.stringify(value));
      } else {
        // Generate a unique ID
        const id = this.generateUniqueId();

        // Add the unique ID to the object
        const objectWithId: Project = { ...value, id: id };

        // Convert the object to a JSON string before saving
        const jsonString = JSON.stringify(objectWithId);

        // Save the JSON string to local storage with the provided key
        localStorage.setItem(id, jsonString);
      }
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }
  }

  private generateUniqueId(): string {
    // Simple function to generate a unique ID using a timestamp and random number
    return new Date().getTime().toString(36) + Math.random().toString(36).substr(2);
  }

  getObjectFromLocalStorage(key: string): Project | null {
    try {
      // Retrieve the JSON string from local storage
      const jsonString = localStorage.getItem(key);

      // Parse the JSON string to get the original object
      return jsonString ? JSON.parse(jsonString) : null;
    } catch (error) {
      console.error('Error retrieving from local storage:', error);
      return null;
    }
  }

  getAllItemsFromLocalStorage(): Project[] {
    const allItems: Project[] = [];

    Object.keys(localStorage).forEach((key) => {
      const value = localStorage.getItem(key);
      if (value) {
        const project: Project = JSON.parse(value);
        allItems.push(project);
      }
    });
    return allItems;
  }

  removeItemFromLocalStorage(key: string): void {
    try {
      // Remove the item with the specified key from local storage
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from local storage:', error);
    }
  }
}
