import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog';
import { COLORS, FONTS } from '@/constants/uiConstants';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning'
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getIconColor = () => {
    switch (type) {
      case 'danger':
        return '#EF4444';
      case 'warning':
        return '#F59E0B';
      case 'info':
        return COLORS.light_blue;
      default:
        return '#F59E0B';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return '⚠';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '⚠';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-md"
        style={{ 
          backgroundColor: COLORS.bg_Colour,
          fontFamily: FONTS.para_01.fontFamily 
        }}
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: getIconColor() }}
            >
              {getIcon()}
            </div>
            <DialogTitle 
              className="text-lg font-semibold"
              style={{ 
                color: COLORS.text_desc,
                fontFamily: FONTS.para_01.fontFamily 
              }}
            >
              {title}
            </DialogTitle>
          </div>
          <DialogDescription 
            className="text-sm"
            style={{ 
              color: COLORS.text_desc,
              fontFamily: FONTS.para_01.fontFamily,
              fontSize: FONTS.para_01.fontSize
            }}
          >
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="gap-2 sm:gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:shadow-[inset_3px_3px_5px_rgba(189,194,199,0.75),inset_-3px_-3px_5px_rgba(255,255,255,0.7)] text-sm"
            style={{
              backgroundColor: COLORS.bg_Colour,
              color: COLORS.text_desc,
              fontFamily: FONTS.para_01.fontFamily,
              fontSize: FONTS.para_01.fontSize
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:shadow-[inset_3px_3px_5px_rgba(123,0,255,0.3),inset_-3px_-3px_5px_rgba(255,255,255,0.7)] text-sm"
            style={{
              backgroundColor: type === 'danger' ? '#EF4444' : COLORS.light_blue,
              color: COLORS.white,
              fontFamily: FONTS.para_01.fontFamily,
              fontSize: FONTS.para_01.fontSize
            }}
          >
            {confirmText}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};