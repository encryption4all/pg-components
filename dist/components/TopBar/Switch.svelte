<script>export let enabled = false;
</script>

<label class="switch">
    <input type="checkbox" bind:checked={enabled} />
    <span class="slider round" />
</label>

<style>
    .switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 16px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: '';
        height: 12px;
        width: 12px;
        left: 2px;
        bottom: 2px;
        transition: 0.4s;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196f3;
    }

    input:checked + .slider:before {
        transform: translateX(24px);
    }

    input:checked + .slider:before {
        background-color: var(--pg-dark-blue);
    }

    input:checked + .slider {
        background-color: var(--pg-white);
    }

    .slider.round {
        border-radius: 8px;
        background-color: var(--pg-grey);
    }

    .slider.round:before {
        background-color: var(--pg-white);
        border-radius: 50%;
    }</style>
