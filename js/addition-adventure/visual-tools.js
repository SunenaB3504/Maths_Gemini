// Visual Tools for Addition Adventure

export function setupVisualTools() {
    const blockBuilder = document.getElementById('block-builder');
    const hintContainer = document.getElementById('hint-container');
    
    // Block builder functionality
    function initBlockBuilder(num1, num2) {
        blockBuilder.style.display = 'block';
        blockBuilder.innerHTML = '<h5>Block Builder</h5>';
        
        const blockArea = document.createElement('div');
        blockArea.className = 'block-area';
        
        // Create number 1 blocks
        const num1Container = document.createElement('div');
        num1Container.className = 'num-blocks';
        num1Container.innerHTML = `<div class="num-label">${num1}</div>`;
        
        const num1Blocks = document.createElement('div');
        num1Blocks.className = 'blocks';
        for (let i = 0; i < num1; i++) {
            const block = document.createElement('div');
            block.className = 'block num1-block';
            num1Blocks.appendChild(block);
        }
        
        num1Container.appendChild(num1Blocks);
        blockArea.appendChild(num1Container);
        
        // Create plus sign
        const plusSign = document.createElement('div');
        plusSign.className = 'plus-sign';
        plusSign.textContent = '+';
        blockArea.appendChild(plusSign);
        
        // Create number 2 blocks
        const num2Container = document.createElement('div');
        num2Container.className = 'num-blocks';
        num2Container.innerHTML = `<div class="num-label">${num2}</div>`;
        
        const num2Blocks = document.createElement('div');
        num2Blocks.className = 'blocks';
        for (let i = 0; i < num2; i++) {
            const block = document.createElement('div');
            block.className = 'block num2-block';
            num2Blocks.appendChild(block);
        }
        
        num2Container.appendChild(num2Blocks);
        blockArea.appendChild(num2Container);
        
        // Create equals sign
        const equalsSign = document.createElement('div');
        equalsSign.className = 'equals-sign';
        equalsSign.textContent = '=';
        blockArea.appendChild(equalsSign);
        
        // Create sum container
        const sumContainer = document.createElement('div');
        sumContainer.className = 'num-blocks sum-blocks';
        sumContainer.innerHTML = `<div class="num-label">?</div>`;
        
        const sumBlocks = document.createElement('div');
        sumBlocks.className = 'blocks sum-area';
        sumContainer.appendChild(sumBlocks);
        
        blockArea.appendChild(sumContainer);
        blockBuilder.appendChild(blockArea);
        
        // Add show sum button
        const showSumButton = document.createElement('button');
        showSumButton.className = 'show-sum-btn';
        showSumButton.textContent = 'Show All Blocks';
        showSumButton.addEventListener('click', function() {
            const sum = num1 + num2;
            sumContainer.querySelector('.num-label').textContent = sum;
            
            sumBlocks.innerHTML = '';
            for (let i = 0; i < sum; i++) {
                const block = document.createElement('div');
                block.className = 'block sum-block';
                sumBlocks.appendChild(block);
            }
        });
        
        blockBuilder.appendChild(showSumButton);
    }
    
    // Show hint functionality
    function showHint(hintText) {
        hintContainer.style.display = 'block';
        document.getElementById('hint-content').innerHTML = hintText;
    }
    
    // Hide hint functionality
    function hideHint() {
        hintContainer.style.display = 'none';
    }
    
    // Expose these functions globally for use by level modules
    window.additionTools = {
        initBlockBuilder,
        showHint,
        hideHint
    };
}
